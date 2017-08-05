/**
 * Created by txl-pc on 2017/8/3.
 */
import axios from 'axios'
import services from '@/config/service_dev.js'
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
let http = {}
let request = function (Vue, service) {
  const host = (services[service] || {host: ''}).host
  return {
    get (action, options) {
      return axios.get(host + action, options)
    },
    delete (action, options) {
      return axios.delete(host + action, options)
    },
    head (action, options) {
      return axios.head(host + action, options)
    },
    post (action, body, options) {
      return axios.post(host + action, body, options)
    },
    put (action, body, options) {
      return axios.put(host + action, body, options)
    },
    patch (action, body, options) {
      return axios.patch(host + action, body, options)
    }
  }
}

http.install = function (Vue, options) {
  Vue.http = function (host) {
    return request(Vue, host)
  }
}

export default http
