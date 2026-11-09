const dashboardPaths = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
}

export const getRoleDashboardPath = (role) => dashboardPaths[role] ?? null
