import request from '@/utils/request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

// 通用的获取表格数据
export async function list(url, params) {
  let pbResp = undefined
  let res = undefined

  const buf = await request({
    url: url + '/list',
    method: 'get',
    params: params
  })
  switch (url) {
    case '/article': {
      pbResp = protoRoot.lookupType('AdminArticleListResp')
      res = pbResp.decode(buf)
      break
    }
    case '/article/category': {
      pbResp = protoRoot.lookupType('AdminCategoryListResp')
      res = pbResp.decode(buf)
      break
    }
    case '/article/comments': {
      break
    }
    case '/article/tags': {
      break
    }
    case '/log/loginLog': {
      break
    }
    case '/log/operateLog/list': {
      break
    }
  }
  if (res === undefined || res.code !== 0) {
    Message({
      message: res !== undefined ? res.msg: 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res !== undefined ? res.msg: 'Error'))
  }
  return res
}

// 通用的表格数据删除
export function del(url, ids) {
  return request({
    url: url + '/' + ids,
    method: 'delete'
  })
}

// 通用表格数据清空
export function clean(url) {
  return request({
    url: url + '/clean',
    method: 'delete'
  })
}

// 通用数据添加
export function add(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}

// 通用数据修改
export function update(url, data) {
  return request({
    url: url,
    method: 'put',
    data: data
  })
}

// 通用单条数据获取
export function get(url, id) {
  return request({
    url: url + '/' + id,
    method: 'get'
  })
}

