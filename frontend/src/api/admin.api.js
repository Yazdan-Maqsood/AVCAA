import axiosClient from './axiosClient'

export const getAllUsers = () => axiosClient.get('/admin/users')
export const updateUserRole = (id, role) => axiosClient.put(`/admin/users/${id}/role`, { role })
export const deleteUser = (id) => axiosClient.delete(`/admin/users/${id}`)
export const getAuditLogs = () => axiosClient.get('/admin/audit-logs')