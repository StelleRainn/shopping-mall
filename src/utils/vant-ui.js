// 将导入 vant 组件的相关代码抽离，保持 main.js 的维护性
// 然后在 main.js 中，将本配置文件导入即可
import Vue from 'vue'

// 全局注册（不推荐）
// import Vant from 'vant'
// Vue.use(Vant)
// 按需注册
import { Button, NavBar, Rate, Switch, Tabbar, TabbarItem, Toast } from 'vant'

Vue.use(Button)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(NavBar)
Vue.use(Toast)
