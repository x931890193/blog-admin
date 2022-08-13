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
