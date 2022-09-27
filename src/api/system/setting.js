import request from '@/utils/request'
import protoRoot from '@/proto/proto'

import { Message as Message } from 'element-ui'

// 修改网站设置
export async function updateSiteSetting(data) {
  console.log(data)
  const SiteInfoReq = protoRoot.lookupType('SiteInfoReq')
  const SiteInfoReqMessage = SiteInfoReq.encode(
    SiteInfoReq.create({
      beian: data.beian,
      title: data.title,
      descriptions: data.descriptions,
      id: data.id,
    })
  ).finish()
  const blob = new Blob([SiteInfoReqMessage], { type: 'buffer' })

  const buf = await request({
    url: '/system/setting/siteSetting',
    method: 'post',
    data: blob
  })
  const BaseResp = protoRoot.lookupType('BaseResp')
  const res = BaseResp.decode(buf)
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

// get网站设置
export async function getSiteSetting() {
  const buf = await request({
    url: '/system/setting/siteSetting',
    method: 'get',
  })
  const resp = protoRoot.lookupType('SiteInfoResp')
  const res = resp.decode(buf)
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

//修改Email配置
export function updateEmailSetting(data) {
  return request({
    url: '/system/setting/emailSetting',
    method: 'put',
    data: data
  })
}

export function getEmailSetting() {
  return request({
    url: '/system/setting/emailSetting',
    method: 'get',
  })
}

//修改about
export async function updateAbout(data) {
  const UpdateAboutRequest = protoRoot.lookupType('UpdateAboutRequest')
  const UpdateAboutRequestMessage = UpdateAboutRequest.encode(
    UpdateAboutRequest.create({
      content: data.content,
      htmlContent: data.htmlContent,
      id: data.id,
    })
  ).finish()
  const blob = new Blob([UpdateAboutRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: '/about/edit',
    method: 'post',
    data: blob
  })
  const BaseResp = protoRoot.lookupType('BaseResp')
  const res = BaseResp.decode(buf)
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

export async function getAbout() {
  const buf = await request({
    url: '/about/get',
    method: 'get',
  })
  const SiteInfoResp = protoRoot.lookupType('SiteInfoResp')
  const res = SiteInfoResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}
