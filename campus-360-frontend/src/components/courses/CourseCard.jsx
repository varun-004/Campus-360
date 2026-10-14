import { NavLink } from "react-router-dom";
import { ArrowRight, BookOpen, Users2 } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Card, CardContent, CardFooter } from "../ui/Card";

const CourseCard = ({ course }) => {
  return (
    <Card className="group flex flex-col transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <Badge variant="brand">{course.courseCode}</Badge>
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          {course.courseName}
        </h2>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
          {course.description || "No description available"}
        </p>

        {course.studentCount != null && (
          <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
            <Users2 className="h-4 w-4" aria-hidden="true" />
            <span>{course.studentCount} students enrolled</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto">
        <NavLink to={`/courses/${course.id}`} className="w-full">
          <Button variant="secondary" className="w-full" rightIcon={ArrowRight}>
            View Details
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
