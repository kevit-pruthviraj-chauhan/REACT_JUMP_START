import axios from 'axios'
import { getAuthTokenLocalStorage } from '../../helpers/handleLocalStorage'

const isLocal = process.env.REACT_APP_LOCAL === 'local'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  params: {} // do not remove this, its added to add params later in the config
})

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    const token = getAuthTokenLocalStorage()

    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
      config.headers.common['Access-Control-Allow-Origin'] = '*'
    } else {
      config.headers.common['Access-Control-Allow-Origin'] = '*'
    }

    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const apiService = {
  getData(action: string) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.get(url)
  },
  postData(action: string, data?: any) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.post(url, data)
  },
  putData(action: string, data?: any) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.put(url, data)
  },
  patchData(action: string, data?: any) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.patch(url, data)
  },
  deleteData(action: string) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.delete(url)
  }
}

export default apiService;
