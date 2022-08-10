import axios from 'axios'
import protobuf from 'protobufjs'

import { Message as Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import config from '@/config'

const baseURL = process.env.NODE_ENV === 'development' ? '/api/admin' : '/api'

// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url process.env.VUE_APP_BASE_API
  withCredentials: true, // send cookies when cross-domain requests
  timeout: config.timeout, // request timeout
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-protobuf'
  },
  responseType: 'arraybuffer'
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return protobuf.util.newBuffer(response.data)
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
