import axios from 'axios'

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

// Automatically add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const saveProfile = (data) => API.post('/user/profile', data)
export const getProfile = () => API.get('/user/profile')
export const getBMI = () => API.get('/user/bmi')
export const generateDiet = () => API.post('/diet/generate')
export const getDietHistory = () => API.get('/diet/history')
export const getSingleHistory = (id) => API.get(`/diet/history/${id}`)