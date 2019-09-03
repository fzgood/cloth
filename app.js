import $request from './utils/request.js';
import $location from './utils/Location.js';
import jumpPage from './utils/router.js';
import { RESPONSE_CODE } from './config/config.js';
import feedback from './utils/feedback.js';

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
  },
  onLaunch: function () {
  },
  $request,
  $location,
  ...feedback,
  jumpPage
})