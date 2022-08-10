import request from '@/utils/request'

import protoRoot from "@/proto/proto";
import { Message as Message } from 'element-ui'

//通用的获取表格数据
export async function list(url, params) {
  switch (url) {
    case "/article/list": {
      break
    }
    case "/article/category": {
      const AdminCategoryListResp = protoRoot.lookupType('AdminCategoryListResp')
      const buf = await request({
        url: url + "/list",
        method: 'get',
        params: params
      })
      const res = AdminCategoryListResp.decode(buf)
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
    case "/article/comments/list": {
      return
    }
    case "/article/tags": {
      return
    }
    case "'/log/loginLog/list": {
      return
    }
    case '/log/operateLog/list': {
      return
    }
  }
}

//通用的表格数据删除
export function del(url, ids) {
  return request({
    url: url + "/" + ids,
    method: 'delete',
  })
}

//通用表格数据清空
export function clean(url) {
  return request({
    url: url + "/clean",
    method: 'delete',
  })
}

//通用数据添加
export function add(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}

//通用数据修改
export function update(url, data) {
  return request({
    url: url,
    method: 'put',
    data: data
  })
}

//通用单条数据获取
export function get(url, id) {
  return request({
    url: url + "/" + id,
    method: 'get',
  })
}


