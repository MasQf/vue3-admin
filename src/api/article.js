import request from '@/utils/request'

//获取文章分类
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
//添加文章分类
export const artAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}
//编辑文章分类
export const artEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}
//删除文章分类
export const artDelChannelService = (artId) => {
  return request.delete('/my/cate/del', {
    params: {
      id: artId
    }
  })
}
/////////////////////////////////////////////
//获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

//发布文章,data要formData格式
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}

//获取文章详情
export const artGetDetailService = (artId) => {
  return request.get('/my/article/info', {
    params: {
      id: artId
    }
  })
}

//更新文章详情
export const artUpdateDetailService = (data) => {
  return request.put('/my/article/info', data)
}
