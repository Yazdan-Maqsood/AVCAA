import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '../components/layout/DashboardLayout'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard'
import UploadCode from '../pages/student/UploadCode'
import TakeViva from '../pages/student/TakeViva'
import MyFeedback from '../pages/student/MyFeedback'

// Teacher Pages
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import SubmissionsList from '../pages/teacher/SubmissionsList'
import ClassAnalytics from '../pages/teacher/ClassAnalytics'
import ViewReport from '../pages/teacher/ViewReport'
// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'

// Common Pages
import NotFound from '../pages/common/NotFound'
import Unauthorized from '../pages/common/Unauthorized'
import Landing from '../pages/Landing'
import SubmissionHistory from '../pages/student/SubmissionHistory'
import ProgressAnalytics from '../pages/student/ProgressAnalytics'
import ContactUs from '../pages/ContactUs'
import AboutUs from '../pages/AboutUs'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      {/* Student Routes with Sidebar Layout */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/upload" element={<UploadCode />} />
          <Route path="/student/feedback" element={<MyFeedback />} />
          <Route path="/student/history" element={<SubmissionHistory />} />
          <Route path="/student/analytics" element={<ProgressAnalytics />} />
        </Route>
        <Route path="/student/viva/:id" element={<TakeViva />} />
      </Route>

      {/* Teacher Routes with Sidebar Layout */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/submissions" element={<SubmissionsList />} />
          <Route path="/teacher/analytics" element={<ClassAnalytics />} />
          <Route path="/teacher/reports/:id" element={<ViewReport />} />
        </Route>
      </Route>

      {/* Admin Routes with Sidebar Layout */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes