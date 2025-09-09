import { delSelItemApi, getCartListApi, updateCountApi } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },

  mutations: {
    updateCartList (state, cartList) {
      state.cartList = cartList
      // console.log(state.cartList)
    },

    // 根据传过来的id，找到对应的购物车内的商品然后修改其isChecked值
    toggleChecked (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) goods.isChecked = !goods.isChecked
    },

    // 大全选按钮可以同步设置所有的小选择按钮
    toggleAllChecked (state, status) {
      state.cartList.forEach(item => { item.isChecked = status })
    },

    // 修改购物车商品数量后，后台完成更新，同步本地
    syncUpdatedCount (state, infos) {
      const { goodsId, goodsNum } = infos
      console.log(goodsId, goodsNum)
      const itemToSync = state.cartList.find(item => item.goods_id === goodsId)
      if (itemToSync) itemToSync.goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车列表
    async fetchCartList (context) {
      const res = await getCartListApi()
      const cartList = res.data.data.list
      // isChecked 属性不来自后端数据，为手动添加数据，后面要用得到
      cartList.forEach(item => {
        item.isChecked = true
      })
      // 提交到 mutations
      context.commit('updateCartList', cartList)
    },

    // 更新商品数量（本地&后台）
    async updateCount (context, infos) {
      const { goodsId, goodsNum, goodsSkuId } = infos
      // 这一步更新后台
      await updateCountApi(goodsId, goodsNum, goodsSkuId)
      // 这一步更新本地
      // 由于返回结果不带对本goodsId的信息，只返回商品总数cartTotal，故暂时用goodsNum模拟后台返回的有效新数据
      context.commit('syncUpdatedCount', { goodsId, goodsNum })
    },

    // 删除购物车商品
    async delSelItem (context) {
      // 通过 context，调用 getters 中的方法。包括后面还可以调用 actions。
      const cartIds = context.getters.selCartList.map(item => item.id)
      await delSelItemApi(cartIds)
      Toast('删除成功')
      // 删除后重新拉取购物车数据
      context.dispatch('fetchCartList')
    }
  },
  getters: {
    // 所有商品的累加总数
    cartTotal: state => state.cartList.reduce((sum, curr) => sum + curr.goods_num, 0),

    // 选中的商品项(此属性为后面两条做铺垫用)
    selCartList: state => state.cartList.filter(item => item.isChecked),

    // 选中的商品总数
    selCount: (state, getters) => getters.selCartList.reduce((sum, curr) => sum + curr.goods_num, 0),

    // 选中的商品总价
    selPriceInTotal: (state, getters) => {
      // 记得保留2位小数
      return getters.selCartList.reduce((sum, curr) => sum + curr.goods_num * curr.goods.goods_price_min, 0).toFixed(2)
    },

    // 是否全选
    isAllChecked: state => state.cartList.every(item => item.isChecked)
  }
}
