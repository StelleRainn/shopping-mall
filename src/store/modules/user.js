import { setInfo, getInfo } from '@/utils/storage'

const state = {
  // 改为由本地存储获取
  // 避免每次刷新后 vuex 数据丢失 → vuex 持久化管理
  userInfo: getInfo()
}

const mutations = {
  setUserInfo (state, payload) {
    state.userInfo = payload // 同步更新当前userInfo
    setInfo(payload)
  }
}
const actions = {
  logoutActions (context) {
    // 清空个人信息
    context.commit('setUserInfo', [])
    // 清空购物车(跨模块调用，需要开启{root:true})
    context.commit('cart/updateCartList', {}, { root: true })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
