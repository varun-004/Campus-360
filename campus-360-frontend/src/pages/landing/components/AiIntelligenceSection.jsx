import { useState } from "react";
import {
  BrainCircuit,
  TrendingUp,
  Activity,
  CheckCircle,
  Target,
  ListTodo,
  Info
} from "lucide-react";

const AiIntelligenceSection = () => {
  // Interactive checklist simulation
  const [checkedItems, setCheckedItems] = useState({
    item1: true,
    item2: false,
    item3: false,
  });

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="ai-intelligence" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-300">
            <BrainCircuit className="h-3.5 w-3.5 text-brand-400" />
            Accurate Predictive Intelligence
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Early Risk Detection Grounded in Concrete Academic Data
          </h2>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            No empty buzzwords. Campus 360 uses an ensemble machine learning model that correlates real attendance consistency with assessment scores to detect academic risk weeks before exams.
          </p>
        </div>

        {/* 3 Core ML Principles */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 mb-4">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">4-Tier Risk Categorization</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Every student is evaluated into <span className="text-emerald-400 font-semibold">Low</span>, <span className="text-amber-400 font-semibold">Moderate</span>, <span className="text-red-400 font-semibold">High</span>, or <span className="text-red-500 font-semibold">Critical</span> risk tiers based on calculated probabilities.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 mb-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Projected Performance Scoring</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Synthesizes previous assessment trajectories with classroom participation to predict end-of-term score ranges, helping learners self-correct early.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 mb-4">
              <Info className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Transparent Explainability</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Never a mysterious &quot;black box.&quot; Students and faculty see the exact feature importance weights (attendance stability, assessment velocity) driving the outcome.
            </p>
          </div>
        </div>

        {/* Interactive AI Intelligence Preview Showcase */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                Live Model Inspection
              </span>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                AI Academic Diagnostic Dashboard
              </h3>
            </div>
            <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-mono font-medium text-brand-300 border border-brand-500/30">
              Model: ML Ensemble v1.4
            </span>
          </div>

          {/* AI Metrics Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
              <span className="text-xs text-slate-400">Predicted Performance Score</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">88.5%</span>
                <span className="text-xs font-semibold text-emerald-400">Positive Trajectory</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Expected future assessment average</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
              <span className="text-xs text-slate-400">Risk Assessment Tier</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-400">LOW RISK</span>
                <span className="text-xs text-slate-400">Probability: 11.2%</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">On track for satisfactory semester completion</p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Academic Strengths
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  Consistent 96% attendance in lectures and practical labs
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  High retention in algorithmic problem-solving tests
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Target className="h-4 w-4 text-amber-400" />
                Areas for Proactive Focus
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  Ensure timely submission on multi-week lab milestones
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  Review Operating Systems concurrency questions
                </li>
              </ul>
            </div>
          </div>

          {/* Explainability & Interactive Action Plan */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Interactive Action Plan */}
            <div className="lg:col-span-2 rounded-xl border border-white/10 bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ListTodo className="h-4 w-4 text-brand-400" />
                <h4 className="text-sm font-bold text-white">Personalized Action Plan (Interactive)</h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: "item1", text: "Maintain perfect attendance in upcoming 4 CS-305 lab sessions" },
                  { id: "item2", text: "Complete practice problem set for Database indexing" },
                  { id: "item3", text: "Schedule 15-minute consultation during faculty office hours" },
                ].map((act) => (
                  <label
                    key={act.id}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-slate-800/80 p-2.5 text-xs text-slate-300 cursor-pointer hover:bg-slate-800 transition"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[act.id]}
                      onChange={() => toggleCheck(act.id)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-900"
                    />
                    <span className={checkedItems[act.id] ? "line-through text-slate-500" : ""}>
                      {act.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Feature Weights */}
            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5 text-brand-400" />
                Feature Weights
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Attendance Rate</span>
                    <span className="font-mono text-brand-300">45%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Midterm Marks Stability</span>
                    <span className="font-mono text-brand-300">35%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: "35%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Lab Coursework Consistency</span>
                    <span className="font-mono text-brand-300">20%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiIntelligenceSection;
