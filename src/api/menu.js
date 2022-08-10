import request from '@/utils/request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

// 获取路由
export async function getRouters() {
  const buf = await request({
    url: '/routers',
    method: 'get'
  })
  const AdminRouterResp = protoRoot.lookupType('AdminRouterResp')
  const res = AdminRouterResp.decode(buf)
  if (res.code !== 0) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}
