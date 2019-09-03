const typeObj = {
  'error': '/static/images/close.png',
  'warning': '/static/images/warning.png'
}
/**
 * 重新封装wx.showToast , 新增type参数
 * @param {Object} options
 *  根据wxapp的默认值传递
 * @param {String} type
 *  图片提醒类型
 */
const showToast = function (options, type) {
  this.hideLoading();
  return new Promise((resolve, reject) => {
    const duration = options.duration || 1500;
    const defaultObj = {
      title: options.title,
      icon: options.icon || 'none',
      duration: duration,
      mask: options.mask || true,
      image: typeObj[type] || options.image,
      success: function () {
        setTimeout(function () {
          resolve();
        }, duration);
      }
    }
    wx.showToast(defaultObj)
  })

};
const showLoading = function (options) {
  var obj = Object.assign({
    mask: true,
  }, options)
  wx.showLoading(obj);
}
const hideLoading = wx.hideLoading;
const hideToast = wx.hideToast;
const showModal = wx.showModal;
const showActionSheet = wx.showActionSheet;

export default {
  showToast,
  hideToast,
  showLoading,
  hideLoading,
  showModal,
  showActionSheet,
}