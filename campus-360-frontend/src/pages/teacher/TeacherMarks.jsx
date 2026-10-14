import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap, Save, Users2 } from "lucide-react";

import { getCourseStudents, addMarksBulk } from "../../services/teacherService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  ListSkeleton,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

function TeacherMarks() {
  useDocumentTitle("Enter Marks");
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);
        if (isMounted) setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStudents();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const filledCount = useMemo(
    () => Object.values(scores).filter((v) => v !== "" && v != null).length,
    [scores],
  );

  const handleScoreChange = (studentId, value) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSaveMarks = async () => {
    if (!subject.trim()) {
      notify.error("Please enter a subject name.");
      return;
    }

    const marksToSave = students
      .filter((s) => scores[s.id] !== "" && scores[s.id] != null)
      .map((s) => ({
        studentId: s.id,
        courseId: Number(courseId),
        subject,
        score: Number(scores[s.id]),
      }));

    if (marksToSave.length === 0) {
      notify.error("Please enter at least one score before saving.");
      return;
    }

    try {
      setSaving(true);
      await addMarksBulk(marksToSave);
      notify.success("Marks saved successfully");
    } catch (error) {
      console.error(error);
      notify.error(error?.response?.data?.message || "Failed to save marks");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <ListSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Assessment"
        title="Enter Marks"
        description="Record scores for all students in this course."
      >
        <Button leftIcon={Save} onClick={handleSaveMarks} loading={saving}>
          Save Marks
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Students"
          value={students.length}
          icon={Users2}
          description="Enrolled in this course"
        />
        <StatCard
          label="Scores Entered"
          value={filledCount}
          icon={GraduationCap}
          description="Out of total students"
          trend={filledCount === students.length ? "up" : "neutral"}
          trendLabel={filledCount === students.length ? "Complete" : "In progress"}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject</CardTitle>
          <CardDescription>Enter the subject name for this assessment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            label="Subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Mathematics, Java Programming"
          />
        </CardContent>
      </Card>

      {students.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No students enrolled"
          description="There are no students in this course to enter marks for."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Score entry</CardTitle>
            <CardDescription>Enter a score (0–100) for each student.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">{student.name}</h3>
                    <p className="text-sm text-slate-500">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {scores[student.id] && (
                      <Badge variant="brand">{scores[student.id]}%</Badge>
                    )}
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={scores[student.id] || ""}
                      onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      className="w-28"
                      placeholder="Score"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default TeacherMarks;
