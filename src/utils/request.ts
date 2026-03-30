import axios from 'axios'
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // 超时时间 5秒
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request