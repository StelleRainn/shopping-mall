import { setInfo, getInfo } from '@/utils/storage'

const state = {
  // 改为由本地存储获取
  // 避免每次刷新后 vuex 数据丢失 → vuex 持久化管理
  userInfo: getInfo()
}

const mutations = {
  setUserInfo (state, payload) {
    setInfo(payload)
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
