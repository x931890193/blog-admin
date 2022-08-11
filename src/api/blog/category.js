import request from '@/utils/request'
import protoRoot from "@/proto/proto";
import { Message as Message } from 'element-ui'


// 查询分类列表
export function listCategory(query) {

  return request({
    url: '/article/category/list',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getCategory(id) {
  return request({
    url: '/article/category/' + id,
    method: 'get'
  })
}

// 新增分类配置
export async function addCategory(form) {
  const AdminCategoryAddRequest = protoRoot.lookupType('AdminCategoryAddRequest')
  const AdminCategoryAddRequestMessage = AdminCategoryAddRequest.encode(
    AdminCategoryAddRequest.create({
      title: form.title,
      description: form.description,
      support: form.support,
    })
  ).finish()
  const blob = new Blob([AdminCategoryAddRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: '/article/category/add',
    method: 'post',
    data: blob
  })

  const AdminCategoryAddResp = protoRoot.lookupType('AdminCategoryAddResp')
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

// 修改分类配置
export function updateCategory(data) {
  return request({
    url: '/article/category/edit',
    method: 'put',
    data: data
  })
}

// 删除分类配置
export function delCategory(id) {
  return request({
    url: '/article/category/delete' + id,
    method: 'delete'
  })
}

// 修改分类推荐
export function changeCategorySupport(id, support) {
  let data = {
    id: id,
    support: support
  };
  updateCategory(data);
}
