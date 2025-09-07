// 本模块封装了关于 vuex 持久化的相关功能
const INFO_KEY = 'StelleRainn-shopping-info'
const HISTORY_KEY = 'StelleRainn-shopping-history'

const getInfo = () => {
  const defaultInfo = { userId: '', token: '' }
  const item = localStorage.getItem(INFO_KEY)
  return item ? JSON.parse(item) : defaultInfo
}

const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

const removeInfo = (info) => {
  localStorage.removeItem(INFO_KEY)
}

const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

const setHistory = (array) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(array))
}

export {
  getInfo,
  setInfo,
  removeInfo,
  getHistory,
  setHistory
}
