const INFO_KEY = 'StelleRainn-shopping-info'

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

export {
  getInfo,
  setInfo,
  removeInfo
}
