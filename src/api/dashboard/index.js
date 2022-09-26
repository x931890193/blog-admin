import request from '@/utils/request'
import protoRoot from "@/proto/proto";
import { Message as Message } from 'element-ui'

export async function listPanelGroup() {
  const buf = await request({
    url: '/dashboard/panelGroup',
    method: 'get'
  })
  const listPanelGroupResp = protoRoot.lookupType('PanelGroupResp')
  const res = listPanelGroupResp.decode(buf)
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

//获取折线图数据
export async function listLineChartData(type) {
  const buf = await request({
    url: '/dashboard/lineChartData/' + type,
    method: 'get'
  })
  const LineChartDataResp = protoRoot.lookupType('LineChartDataResp')
  const res = LineChartDataResp.decode(buf)
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

//获取访问来源数据
export function listAccessData() {
  return request({
    url: '/dashboard/access',
    method: 'get',
  })
}

//获取爬虫访问数据
export function listSpiderData() {
  return request({
    url: '/dashboard/spiderData',
    method: 'get',
  })
}

//获取访问日志
export function listVisitLog(params) {
  return request({
    url: '/dashboard/visitLog',
    method: 'get',
    params: params
  })
}

//获取操作日志
export function listOperateLog(params) {
  return request({
    url: '/dashboard/operateLog',
    method: 'get',
    params: params
  })
}

//获取任务日志
export function listTaskLog(params) {
  return request({
    url: '/dashboard/taskLog',
    method: 'get',
    params: params
  })
}

//获取登录日志
export function listLoginLog(params) {
  return request({
    url: '/dashboard/loginLog',
    method: 'get',
    params: params
  })
}
