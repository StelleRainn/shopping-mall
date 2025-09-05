import { setInfo } from '@/utils/storage'

const state = {
  userInfo: {
    userId: '',
    token: ''
  }
}

const mutations = {
  setUserInfo (state, payload) {
    // state.userId = payload.userId
    // state.token = payload.token
    // console.log(payload)
    // console.log(state.userId, state.token)
    state.userInfo = payload
    console.log(state.userInfo)
    setInfo(state.userInfo)
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
