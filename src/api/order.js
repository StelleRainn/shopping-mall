import request from '@/utils/request'

export const checkOrderApi = (mode, obj) => {
  return request.get('checkout/order', {
    params: {
      /**
       * mode: buyNow 从立即购买页跳转到订单
       * mode: cart 从购物车跳转到订单
       */
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      ...obj
    }
  })
}

export const submitOrderApi = (mode, obj) => {
  /**
   * mode: buyNow -> {goodsId, goodsNum, goodsSkuId, remark}
   * mode: cart -> {cartIds, remark}
   */
  return request.post('checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
