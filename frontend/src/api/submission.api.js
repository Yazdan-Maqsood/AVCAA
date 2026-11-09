import axiosClient from './axiosClient'

export const uploadCode = (formData) => axiosClient.post('/submissions/upload', formData)
export const getMySubmissions = () => axiosClient.get('/submissions/my')
export const getSubmissionById = (id) => axiosClient.get(`/submissions/${id}`)
export const getAllSubmissions = () => axiosClient.get('/submissions/all')
export const getSubmissionCode = (id) => axiosClient.get(`/submissions/${id}/code`)