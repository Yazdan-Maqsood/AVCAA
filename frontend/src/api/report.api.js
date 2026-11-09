import axiosClient from './axiosClient'

export const getStudentReport = (studentId) => axiosClient.get(`/reports/student/${studentId}`)

export const downloadReport = (reportId) => axiosClient.get(`/reports/${reportId}/download`, { responseType: 'blob' })

export const getClassAnalytics = () => axiosClient.get('/analytics/class')

export const getTeacherDashboardStats = () => axiosClient.get('/analytics/teacher-dashboard')