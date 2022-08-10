import request from '@/utils/request'
import protoRoot from "@/proto/proto";
import { Message as Message } from 'element-ui'


// 查询博客列表
export function listBlog(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 查询博客详细
export function getBlog(id) {
  return request({
    url: '/article?' + id,
    method: 'get'
  })
}

// 新增博客配置
export async function addBlog(form) {
  const AdminArticleAddRequest = protoRoot.lookupType('AdminArticleAddRequest')
  const AdminArticleAddRequestMessage = AdminArticleAddRequest.encode(
    AdminArticleAddRequest.create({
      title: form.title,
      summary: form.summary,
      categoryId: form.categoryId,
      support: form.support,
      comment: form.comment,
      headerImgType: form.headerImgType,
      headerImg: form.headerImg,
      weight: form.weight,
      tagTitleList: form.tagTitleList,
      content: form.content
    })
  ).finish()
  const blob = new Blob([AdminArticleAddRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: '/article/add',
    method: 'post',
    data: blob
  })
  const AdminArticleAddResp = protoRoot.lookupType('AdminArticleAddResp')
  const res = AdminArticleAddResp.decode(buf)
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

// 修改博客配置
export function updateBlog(data) {
  return request({
    url: '/blog/blog',
    method: 'put',
    data: data
  })
}

// 删除博客配置
export function delBlog(id) {
  return request({
    url: '/blog/blog/' + id,
    method: 'delete'
  })
}

// 修改博客推荐
export function changeBlogSupport(id, support) {
  let data = {
    id: id,
    support: support
  };
  return request({
    url: '/blog/blog/support',
    method: 'put',
    data: data
  })
}


// 修改博客评论
export function changeBlogComment(id, comment) {
  let data = {
    id: id,
    comment: comment
  };
  return request({
    url: '/article/comment',
    method: 'put',
    data: data
  })
}

//获取Blog Tag
export function listBlogTagList(query) {
  return request({
    url: '/article/tag' + query,
    method: 'get',
  })
}


// 新增博客草稿
export function addBlogDraft(data) {
  return request({
    url: '/article/draft',
    method: 'post',
    data: data
  })
}

// 修改博客草稿
export function updateBlogDraft(data) {
  return request({
    url: '/article/draft',
    method: 'put',
    data: data
  })
}
