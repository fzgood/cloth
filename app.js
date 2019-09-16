import $request from './utils/request.js';
import $location from './utils/Location.js';
import jumpPage from './utils/router.js';
import { RESPONSE_CODE } from './config/config.js';
import feedback from './utils/feedback.js';

import GlobalConfig from './config/upload'
const globalConfig = new GlobalConfig()
globalConfig.init()


Promise.prototype.finally = callback => {
  return this.then(
    value => this.constructor.resolve(callback()).then(() => value),
    reason => this.constructor.resolve(callback()).then(() => { throw reason })
  )
}

App({
  globalData: {
    userInfo: null,
    RESPONSE_CODE,
    config: globalConfig
  },
  onLaunch: function () {
    this.login();
  },
  $request,
  $location,
  ...feedback,
  jumpPage,
  login(){
    return new Promise((resolve, reject)=>{
      wx.login({
        success: res=> {
          if (res.code) {
            this.$request.post('/apiIndex/index/wechatLogin', {
              code: res.code
            }).then(res=>{
              if (res.code === this.globalData.RESPONSE_CODE.SUCCESS){
                wx.setStorageSync('token', res.data.token);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    })
  },
  checkLogin(fn){
    wx.checkSession({
      success() {
        fn && fn();
      },
      fail() {
        this.login().then(res=>{
          fn && fn()
        });
      }
    })
  }
})