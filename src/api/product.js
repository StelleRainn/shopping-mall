import request from '@/utils/request'

// 获取商品搜索结果
export const getSearchResult = (obj) => {
  const { categoryId, goodsName, page } = obj
  const res = request.get('goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
  return res
}

// 获取商品详情
export const getProDetail = (goodsId) => {
  return request.get('goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评论
export const getProComments = (goodsId, limit) => {
  return request.get('comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
