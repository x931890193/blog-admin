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
    // 友情链接
    case '/link': {
      pbResp = protoRoot.lookupType('LinkListResp')
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
    default: {
      return Promise.reject(new Error('get list url not match'))
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
export async function add(url, form) {
  switch (url) {
    case '/article/category': {
      const AdminCategoryAddRequest = protoRoot.lookupType('AdminCategoryAddRequest')
      const AdminCategoryAddRequestMessage = AdminCategoryAddRequest.encode(
        AdminCategoryAddRequest.create({
          title: form.title,
          description: form.description,
          support: form.support,
        })
      ).finish()
      const blob = new Blob([AdminCategoryAddRequestMessage], {type: 'buffer'})
      const buf = await request({
        url: '/article/category/add',
        method: 'post',
        data: blob
      })

      const AdminCategoryAddResp = protoRoot.lookupType('BaseResp')
      const res = AdminCategoryAddResp.decode(buf)
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
    case '/link': {
      const LinkRequest = protoRoot.lookupType('LinkRequest')
      const LinkRequestMessage = LinkRequest.encode(
        LinkRequest.create({
          title: form.title,
          description: form.description,
          email: form.email,
          url: form.url,
          headerImg: form.headerImg,
          display: form.display,
        })
      ).finish()
      const blob = new Blob([LinkRequestMessage], {type: 'buffer'})
      const buf = await request({
        url: '/link/add',
        method: 'post',
        data: blob
      })
      const res = protoRoot.lookupType('BaseResp').decode(buf)
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
    default: {
      return Promise.reject(new Error('add data url not match'))
    }
  }
}

// 通用数据修改
export async function update(url, form) {
  switch (url) {
    case '/article/category': {
      const AdminEditCategoryRequest = protoRoot.lookupType('AdminEditCategoryRequest')
      const AdminEditCategoryRequestMessage = AdminEditCategoryRequest.encode(
        AdminEditCategoryRequest.create({
          id: form.id,
          title: form.title,
          description: form.description
        })
      ).finish()
      const blob = new Blob([AdminEditCategoryRequestMessage], { type: 'buffer' })
      const buf = await request({
        url: '/article/category/edit',
        method: 'post',
        data: blob
      })
      const res = protoRoot.lookupType('BaseResp').decode(buf)
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
    case '/link': {
      const LinkRequest = protoRoot.lookupType('LinkRequest')
      const LinkRequestMessage = LinkRequest.encode(
        LinkRequest.create({
          title: form.title,
          description: form.description,
          email: form.email,
          url: form.url,
          headerImg: form.headerImg,
          display: form.display,
        })
      ).finish()
      const blob = new Blob([LinkRequestMessage], {type: 'buffer'})
      const buf = await request({
        url: '/links/edit',
        method: 'post',
        data: blob
      })
      break

    }
    default: {
      return Promise.reject(new Error('edit data url not match'))
    }
  }
}

// 通用单条数据获取
export function get(url, id) {
  return request({
    url: url + '/' + id,
    method: 'get'
  })
}

