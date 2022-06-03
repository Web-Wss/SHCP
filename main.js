
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入escook/request-miniprogram
import { $http } from '@escook/request-miniprogram'



uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'http://localhost:8080/Interfaces'
$http.baseUrl = 'http://www.massz.shop/Interfaces_web-1.0-SNAPSHOT'
// 请求拦截器
$http.beforeRequest = function(options) {
  // 请求头
  options.header = {
    "token" :uni.getStorageSync('token')
  },
  uni.showLoading({
    title:"数据加载中..."
  })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}
// 封装弹窗的方法
uni.$showMsg = function(title='数据请求失败',duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif