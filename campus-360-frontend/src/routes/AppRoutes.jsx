import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../auth/ProtectedRoute";
import RoleProtectedRoute from "../auth/RoleProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetailsPage from "../pages/courses/CourseDetailsPage";

import AttendanceMarkPage from "../pages/attendance/AttendanceMarkPage";
import AttendanceHistoryPage from "../pages/attendance/AttendanceHistoryPage";
import AttendanceReportPage from "../pages/attendance/AttendanceReportPage";

import MarksEntryPage from "../pages/marks/MarksEntryPage";
import StudentMarksReportPage from "../pages/marks/StudentMarksReportPage.jsx";
import TopPerformersPage from "../pages/marks/TopPerformersPage";

import StudentRiskPage from "../pages/analytics/StudentRiskPage";
import AIIntelligenceDashboard from "../pages/student/AIIntelligenceDashboard";

import TeacherAnalytics from "../pages/teacher/TeacherAnalytics";
import TeacherCourses from "../pages/teacher/TeacherCourses";
import TeacherAttendance from "../pages/teacher/TeacherAttendance";
import TeacherMarks from "../pages/teacher/TeacherMarks";
import TeacherMarksHistory from "../pages/teacher/TeacherMarksHistory";
import TeacherCourseDetails from "../pages/teacher/TeacherCourseDetails";
import TeachersPage from "../pages/admin/TeachersPage";
import TeacherDashboard
from "../pages/teacher/TeacherDashboard";

import AddTeacherPage from "../pages/admin/AddTeacherPage";
import EditTeacherPage from "../pages/admin/EditTeacherPage";

import StudentsPage from "../pages/admin/StudentsPage";
import AddStudentPage from "../pages/admin/AddStudentPage";
import EditStudentPage from "../pages/admin/EditStudentPage";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* COURSES */}

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CoursesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CourseDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <h1 className="text-3xl font-bold">Admin Page</h1>
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/mark"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                <DashboardLayout>
                  <AttendanceMarkPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/history"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                <DashboardLayout>
                  <AttendanceHistoryPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/report"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                <DashboardLayout>
                  <AttendanceReportPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/entry"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                <DashboardLayout>
                  <MarksEntryPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/report"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                <DashboardLayout>
                  <StudentMarksReportPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/top-performers"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                <DashboardLayout>
                  <TopPerformersPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/risk"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                <DashboardLayout>
                  <StudentRiskPage />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/ai-insights"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                <DashboardLayout>
                  <AIIntelligenceDashboard />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER"]}>
                <DashboardLayout>
                  <TeacherCourses />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/course/:courseId/attendance"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER"]}>
                <DashboardLayout>
                  <TeacherAttendance />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/course/:courseId/marks"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER"]}>
                <DashboardLayout>
                  <TeacherMarks />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/course/:courseId/analytics"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["TEACHER"]}>
                <DashboardLayout>
                  <TeacherAnalytics />
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

       <Route
  path="/teacher/course/:courseId"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["TEACHER"]}>
        <DashboardLayout>
          <TeacherCourseDetails />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/teachers"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["ADMIN"]}
      >
        <DashboardLayout>
          <TeachersPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/students"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <DashboardLayout>
          <StudentsPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/students/add"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <DashboardLayout>
          <AddStudentPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/students/edit/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <DashboardLayout>
          <EditStudentPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/teachers/add"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["ADMIN"]}
      >
        <DashboardLayout>
          <AddTeacherPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/teachers/edit/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["ADMIN"]}
      >
        <DashboardLayout>
          <EditTeacherPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/teacher/course/:courseId/marks-history"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["TEACHER"]}
      >
        <DashboardLayout>
          <TeacherMarksHistory />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/teacher/dashboard"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["TEACHER"]}
      >
        <DashboardLayout>
          <TeacherDashboard />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>


<Route
  path="/teacher/course/:courseId/attendance-history"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={["TEACHER"]}
      >
        <DashboardLayout>
          <AttendanceHistoryPage />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>
        {/* ERROR ROUTES */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
