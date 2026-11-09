import axiosClient from './axiosClient'

const getPayload = (response) => response?.data?.data ?? response?.data ?? response

export const login = async (data) => getPayload(await axiosClient.post('/auth/login', data))
export const register = (data) => axiosClient.post('/auth/register', data)
export const getMe = async () => getPayload(await axiosClient.get('/auth/me'))