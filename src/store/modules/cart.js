import { getCartListApi } from '@/api/cart'

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
    }
  },
  actions: {
    async fetchCartList (context) {
      const res = await getCartListApi()

      const cartList = res.data.data.list

      // isChecked 属性不来自后端数据，为手动添加数据
      cartList.forEach(item => {
        item.isChecked = true
      })

      // 提交到 mutations
      context.commit('updateCartList', cartList)
    }
  },
  getters: {}
}
