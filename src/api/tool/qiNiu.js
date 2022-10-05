import request from '@/utils/request'

import protoRoot from "@/proto/proto";
import { Message as Message } from 'element-ui'

// 查询列表
export async function listContent(query) {
  const buf = await request({
    url: '/tool/qiNiu',
    method: 'get',
    params: query
  })
}

//下载
export async function downloadContent(id) {
  const buf = await request({
    url: '/tool/qiNiu/download/' + id,
    method: 'get'
  })
}

//同步
export async function syncContent() {
  const buf = await request({
    url: '/tool/qiNiu/synchronize',
    method: 'post'
  })
}

//获取配置文件
export async function getQiNiuConfig() {
  const buf = await request({
    url: '/tool/qiNiu/config',
    method: 'get'
  })
  const QiNiuConfig = protoRoot.lookupType('QiNiuConfig')
  const res = QiNiuConfig.decode(buf)
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

//更新配置文件
export async function updateQiNiuConfig(data) {
  const QiNiuConfig = protoRoot.lookupType('QiNiuConfig')
  const QiNiuConfigMessage = QiNiuConfig.encode(
    QiNiuConfig.create({
      accessKey: data.accessKey,
      secretKey: data.secretKey,
      bucket:    data.bucket,
    })
  ).finish()
  const blob = new Blob([QiNiuConfigMessage], { type: 'buffer' })

  const buf = await request({
    url: '/tool/qiNiu/config',
    method: 'put',
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
