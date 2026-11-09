import axiosClient from './axiosClient'

export const startViva = (submissionId) => axiosClient.post('/viva/start', { submissionId })

export const getVivaQuestions = async (submissionId) => {
  const response = await axiosClient.get(`/viva/${submissionId}/questions`)
  return response.data?.questions ?? []
}

export const submitAnswer = async (submissionId, data) => {
  const response = await axiosClient.post(`/viva/${submissionId}/answer`, data)
  return response.data
}

export const submitModification = (vivaId, data) => axiosClient.post(`/viva/${vivaId}/modify`, data)

export const endViva = (vivaId) => axiosClient.post(`/viva/${vivaId}/end`)

export const getMyVivaFeedback = () => axiosClient.get('/viva/my-feedback')

export const getMyAnalytics = () => axiosClient.get('/viva/my-analytics')