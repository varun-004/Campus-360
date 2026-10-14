import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ClipboardList, GraduationCap } from "lucide-react";

import { getMarksByCourse, deleteMarks, updateMarks } from "../../services/teacherService";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from "../../components/ui";

function TeacherMarksHistory() {
  useDocumentTitle("Marks History");
  const { courseId } = useParams();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMark, setEditingMark] = useState(null);
  const [editedScore, setEditedScore] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadMarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMarksByCourse(courseId);
      setMarks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    let isMounted = true;

    const fetchMarks = async () => {
      try {
        setLoading(true);
        const data = await getMarksByCourse(courseId);
        if (isMounted) setMarks(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMarks();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteMarks(deleteTarget.id);
      await loadMarks();
      notify.success("Marks record deleted");
    } catch (error) {
      console.error(error);
      notify.error("Failed to delete marks");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (mark) => {
    setEditingMark(mark);
    setEditedScore(mark.score);
  };

  const handleUpdate = async () => {
    try {
      await updateMarks(editingMark.id, { score: Number(editedScore) });
      setEditingMark(null);
      await loadMarks();
      notify.success("Marks updated successfully");
    } catch (error) {
      console.error(error);
      notify.error("Failed to update marks");
    }
  };

  const avgScore =
    marks.length > 0
      ? marks.reduce((sum, m) => sum + m.score, 0) / marks.length
      : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={6} cols={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Assessment"
        title="Marks History"
        description="Review and update student marks for this course."
      />

      {marks.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Total Records"
            value={marks.length}
            icon={ClipboardList}
            description="Marks entries logged"
          />
          <StatCard
            label="Average Score"
            value={avgScore.toFixed(1)}
            icon={GraduationCap}
            description="Across all entries"
            trend="up"
            trendLabel="Average"
          />
        </div>
      )}

      {marks.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No marks recorded"
          description="Marks entries for this course will appear here once submitted."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Course marks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {marks.map((mark, index) => (
                  <AnimatedTableRow key={mark.id} index={index} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {mark.studentName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{mark.subject}</td>
                    <td className="px-4 py-3">
                      {editingMark?.id === mark.id ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editedScore}
                          onChange={(e) => setEditedScore(e.target.value)}
                          className="w-24"
                        />
                      ) : (
                        <span className="font-semibold text-slate-900">{mark.score}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success">{mark.grade}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {editingMark?.id === mark.id ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="sm" onClick={() => setEditingMark(null)}>
                            Cancel
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleUpdate}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="sm" onClick={() => handleEdit(mark)}>
                            Edit
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => setDeleteTarget(mark)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete marks record"
        message="Remove this marks entry from the course history?"
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default TeacherMarksHistory;
