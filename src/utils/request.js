import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 自定义axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }

})

// 自定义请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 添加loading样式
  // p.s. Toast是单例模式，同一时间只能存在一个，后续的Toast可以直接覆盖前面的
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 加载样式
    duration: 0 // 持续时间，设置为0表示不自动消失
  })

  // 补充一个header参数（不能在create中添加）
  config.headers['Access-Token'] = store.state.user.userInfo.token

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 1. 给提示
    Toast(res.message)
    // 2. 抛出错误提示
    return Promise.reject(res.message)
  }
  Toast.clear()
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
