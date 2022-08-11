import request from '@/utils/request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

// 登录方法
export async function login(username, password, code, uuid) {
  const LoginAdminRequest = protoRoot.lookupType('LoginAdminRequest')
  const Base64 = require('js-base64').Base64
  const LoginAdminRequestMessage = LoginAdminRequest.encode(
    LoginAdminRequest.create({
      username: username,
      password: Base64.encode(password),
      code: code,
      id: uuid
    })
  ).finish()
  const blob = new Blob([LoginAdminRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: '/login',
    method: 'post',
    data: blob
  })
  const LoginAdminResp = protoRoot.lookupType('LoginAdminResp')
  const res = LoginAdminResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

// 获取用户详细信息
export async function getInfo() {
  const buf = await request({
    url: '/info',
    method: 'get'
  })
  const AdminInfoResp = protoRoot.lookupType('AdminInfoResp')
  const res = AdminInfoResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

// 退出方法
export async function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export async function getCodeImg() {
  const buf = await request({
    url: '/captcha',
    method: 'get'
  })
  const CaptchaResp = protoRoot.lookupType('CaptchaResp')
  const res = CaptchaResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}
