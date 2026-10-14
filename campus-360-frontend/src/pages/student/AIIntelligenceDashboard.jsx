import { useEffect, useState } from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, CheckCircle, Target, ListTodo, Activity, Info } from "lucide-react";
import { getStudentAIPrediction } from "../../services/aiService";
import { getStudentByEmail } from "../../services/studentService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAuth from "../../auth/useAuth";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

const getRiskColor = (risk) => {
  switch (risk) {
    case "LOW_RISK": return "success";
    case "MODERATE_RISK": return "warning";
    case "HIGH_RISK": return "danger";
    case "CRITICAL_RISK": return "danger";
    default: return "default";
  }
};

const getRiskLabel = (risk) => {
  return risk?.replace("_", " ");
};

const AIIntelligenceDashboard = () => {
  useDocumentTitle("AI Academic Intelligence");
  
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Assuming current user is a student
        const student = await getStudentByEmail(user.email);
        const prediction = await getStudentAIPrediction(student.id);
        setData(prediction);
      } catch (err) {
        console.error(err);
        setError("AI Engine temporarily unavailable or insufficient data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
        <h3 className="text-lg font-semibold mb-1">Analysis Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Powered by ML Ensemble"
        title="AI Academic Intelligence"
        description="Predictive insights and personalized recommendations based on your academic trajectory."
      >
        <Badge variant="brand" className="px-3 py-1">
          <BrainCircuit className="mr-1.5 h-3.5 w-3.5" />
          Model: {data.modelVersion}
        </Badge>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <StatCard
          label="Predicted Performance Score"
          value={`${data.predictedPerformance}%`}
          icon={TrendingUp}
          description="Expected future average"
          trend={data.predictedPerformance >= 70 ? "up" : "down"}
          trendLabel={data.predictedPerformance >= 70 ? "Positive Trajectory" : "Needs Attention"}
        />
        <StatCard
          label="Risk Assessment"
          value={getRiskLabel(data.riskCategory)}
          icon={Activity}
          description={`Probability: ${(data.riskProbability * 100).toFixed(1)}%`}
          trend={data.riskCategory === "LOW_RISK" ? "up" : "down"}
          trendLabel="AI Classification"
          valueClassName={
            data.riskCategory === "LOW_RISK" ? "text-emerald-600" :
            data.riskCategory === "MODERATE_RISK" ? "text-amber-600" :
            "text-red-600"
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-100 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
              Academic Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-emerald-900">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-800">
              <Target className="mr-2 h-5 w-5 text-amber-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-amber-900">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full border-brand-100 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ListTodo className="mr-2 h-5 w-5 text-brand-600" />
                Personalized Action Plan
              </CardTitle>
              <CardDescription>AI-generated steps to optimize your success.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {data.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <span className="mr-2 mt-0.5 text-brand-500 font-bold">{idx + 1}.</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-2">Immediate Steps</h4>
                  <div className="flex flex-col gap-2">
                    {data.actionPlan.map((action, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                        <span className="text-sm font-medium text-slate-700">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <BrainCircuit className="mr-2 h-5 w-5 text-brand-400" />
                Explainability
              </CardTitle>
              <CardDescription className="text-slate-400">Model interpretation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-lg bg-slate-800 p-4">
                <p className="text-sm text-slate-300">
                  <Info className="inline h-4 w-4 mr-1 text-slate-400 mb-0.5" />
                  {data.keyFactorSummary}
                </p>
              </div>
              
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Predictive Factors
              </h4>
              <div className="space-y-3">
                {Object.entries(data.featureImportance || {}).slice(0, 4).map(([feature, weight]) => (
                  <div key={feature}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 capitalize">{feature.replace("_", " ")}</span>
                      <span className="text-brand-300">{(weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-500 rounded-full" 
                        style={{ width: `${Math.min(weight * 200, 100)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIIntelligenceDashboard;
