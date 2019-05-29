import axios from 'axios'
import store from 'store'
window.store = store
const config = {
  baseURL: 'http://192.168.43.41:3382/api'
}

const request = axios.create(config)

request.interceptors.request.use(
  config => {
    if (!config.noToken) {
      const { token } = store
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }

    return config
  },

  err => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  response => {
    const { data, status } = response

    data.__proto__ = {
      get _response() {
        return response
      },

      get _status() {
        return status
      }
    }

    if (status === 401) {
      // 或许是 token 过期
      Object.assign(store, {
        isLogin: false
        // token: null
      })

      throw Object.assign(
        Error('INVALID_TOKEN'),
        { SILENT: true }
      )
    }

    return data
  },

  axiosErr => {
    const { response } = axiosErr
    const { data, status } = response

    const err = data.message ? Error(data.message) : Error(axiosErr.message)

    Object.assign(err, {
      data,
      response,
      status
    })

    return Promise.reject(err)
  }
)

export default request
