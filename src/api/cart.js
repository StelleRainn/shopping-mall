import request from '@/utils/request'

export const addToCartApi = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getCartListApi = () => {
  return request.get('cart/list')
}

export const updateCountApi = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
