import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import actions from 'utils/actions.js'
import './publicPath'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios

let router = null
let instance = null

function render (props = {}) {
  const { container } = props
  if (props) {
    Vue.prototype.$pluginAPI = props.pluginAPI
  }

  // actions.setActions(props)
  router = new VueRouter({
    // base: window.__POWERED_BY_QIANKUN__ ? '/' : process.env.BASE_URL,
    base: '/plugin/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')

  console.log(App)
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  // props 包含主应用传递的参数  也包括为子应用 创建的节点信息
  render(props)
  console.log(props, 'props')
}

export async function unmount () {
  console.log('Plugin unmount')
  instance.$destroy()
  instance = null
  router = null
  // actions.offGlobalStateChange()
}

export async function update (props) {
  console.log('update props', props)
}
