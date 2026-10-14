"""
ML Model Training & Prediction Module
======================================
Hybrid Random Forest + Logistic Regression ensemble for student success prediction.
Features: attendance_rate, average_score, score_std, total_courses, total_assessments,
          min_score, max_score, score_trend (improving/declining).
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
import joblib
import os
import logging

logger = logging.getLogger(__name__)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "trained_models")
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_VERSION = "1.0.0"

# ─── Risk categories ───
RISK_LABELS = {0: "LOW_RISK", 1: "MODERATE_RISK", 2: "HIGH_RISK", 3: "CRITICAL_RISK"}

FEATURE_NAMES = [
    "attendance_rate",
    "average_score",
    "score_std",
    "total_courses",
    "total_assessments",
    "min_score",
    "max_score",
    "score_trend",
]


def _generate_synthetic_training_data(n_samples=2000):
    """
    Generate realistic synthetic student data for initial model training.
    This is used when no real training data is available yet.
    """
    rng = np.random.RandomState(42)

    attendance = rng.beta(5, 2, n_samples) * 100  # skewed toward higher attendance
    avg_score = rng.normal(65, 18, n_samples).clip(0, 100)
    score_std = rng.exponential(12, n_samples).clip(0, 40)
    total_courses = rng.randint(1, 8, n_samples).astype(float)
    total_assessments = (total_courses * rng.randint(2, 6, n_samples)).astype(float)
    min_score = (avg_score - score_std * rng.uniform(0.8, 1.5, n_samples)).clip(0, 100)
    max_score = (avg_score + score_std * rng.uniform(0.8, 1.5, n_samples)).clip(0, 100)
    score_trend = rng.uniform(-15, 15, n_samples)  # positive = improving

    X = np.column_stack([
        attendance, avg_score, score_std, total_courses,
        total_assessments, min_score, max_score, score_trend
    ])

    # Risk label logic (realistic multi-factor):
    # Composite risk score based on weighted factors
    risk_score = (
        (100 - attendance) * 0.30
        + (100 - avg_score) * 0.35
        + score_std * 0.10
        + (-score_trend) * 0.15
        + (100 - max_score) * 0.10
    )

    # Add noise to prevent perfect separability
    risk_score += rng.normal(0, 5, n_samples)

    y = np.zeros(n_samples, dtype=int)
    y[risk_score > 25] = 1  # MODERATE
    y[risk_score > 45] = 2  # HIGH
    y[risk_score > 65] = 3  # CRITICAL

    return pd.DataFrame(X, columns=FEATURE_NAMES), y


class StudentSuccessModel:
    """Ensemble model combining Random Forest + Logistic Regression."""

    def __init__(self):
        self.rf_model = RandomForestClassifier(
            n_estimators=150,
            max_depth=8,
            min_samples_split=10,
            min_samples_leaf=5,
            random_state=42,
            class_weight="balanced",
        )
        self.lr_model = LogisticRegression(
            max_iter=1000,
            multi_class="multinomial",
            random_state=42,
            class_weight="balanced",
        )
        self.scaler = StandardScaler()
        self.is_trained = False
        self.model_version = MODEL_VERSION

    def train(self, X: pd.DataFrame = None, y: np.ndarray = None):
        """Train models. Uses synthetic data if no real data provided."""
        if X is None or y is None:
            logger.info("No real training data provided. Using synthetic data.")
            X, y = _generate_synthetic_training_data()

        X_scaled = self.scaler.fit_transform(X)

        self.rf_model.fit(X_scaled, y)
        self.lr_model.fit(X_scaled, y)

        # Log cross-validation scores
        rf_scores = cross_val_score(self.rf_model, X_scaled, y, cv=5, scoring="accuracy")
        logger.info(f"RF CV Accuracy: {rf_scores.mean():.3f} (+/- {rf_scores.std():.3f})")

        self.is_trained = True
        self._save()
        logger.info("Model trained and saved successfully.")

    def predict(self, features: dict) -> dict:
        """
        Predict risk for a single student.
        Returns risk category, probability, and feature importances.
        """
        if not self.is_trained:
            self._load_or_train()

        X = pd.DataFrame([features], columns=FEATURE_NAMES)
        X_scaled = self.scaler.transform(X)

        # Ensemble: average probabilities from both models
        rf_proba = self.rf_model.predict_proba(X_scaled)[0]
        lr_proba = self.lr_model.predict_proba(X_scaled)[0]
        ensemble_proba = (rf_proba * 0.6 + lr_proba * 0.4)  # RF weighted higher

        predicted_class = int(np.argmax(ensemble_proba))
        risk_probability = float(1.0 - ensemble_proba[0])  # probability of NOT being low-risk

        # Feature importances from Random Forest
        rf_importances = self.rf_model.feature_importances_
        feature_importance = {
            FEATURE_NAMES[i]: round(float(rf_importances[i]), 4)
            for i in range(len(FEATURE_NAMES))
        }

        # Sort by importance
        feature_importance = dict(
            sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
        )

        # Performance prediction (0-100 scale)
        perf_score = (
            features.get("average_score", 50) * 0.40
            + features.get("attendance_rate", 50) * 0.25
            + features.get("score_trend", 0) * 0.15
            + (100 - features.get("score_std", 20)) * 0.10
            + min(features.get("max_score", 50), 100) * 0.10
        )
        predicted_performance = round(max(0, min(100, perf_score)), 1)

        return {
            "risk_category": RISK_LABELS[predicted_class],
            "risk_probability": round(risk_probability, 4),
            "predicted_performance": predicted_performance,
            "class_probabilities": {
                RISK_LABELS[i]: round(float(ensemble_proba[i]), 4)
                for i in range(len(ensemble_proba))
            },
            "feature_importance": feature_importance,
            "model_version": self.model_version,
        }

    def _save(self):
        joblib.dump(self.rf_model, os.path.join(MODEL_DIR, "rf_model.pkl"))
        joblib.dump(self.lr_model, os.path.join(MODEL_DIR, "lr_model.pkl"))
        joblib.dump(self.scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
        logger.info("Models saved to disk.")

    def _load_or_train(self):
        rf_path = os.path.join(MODEL_DIR, "rf_model.pkl")
        lr_path = os.path.join(MODEL_DIR, "lr_model.pkl")
        scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")

        if os.path.exists(rf_path) and os.path.exists(lr_path) and os.path.exists(scaler_path):
            self.rf_model = joblib.load(rf_path)
            self.lr_model = joblib.load(lr_path)
            self.scaler = joblib.load(scaler_path)
            self.is_trained = True
            logger.info("Models loaded from disk.")
        else:
            logger.info("No saved models found. Training from scratch.")
            self.train()


# Singleton instance
model = StudentSuccessModel()
