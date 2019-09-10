// pages/product/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    types: ['高档','中档','低档'],
    typesIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#product-box').fields({
      size: true,
    }, res => {
      this.setData({
        scrollHeight: res.height
      })
    }).exec()
    this.joinCart = this.selectComponent('#joinCart')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindJumpPage(e){
    const page = e.currentTarget.dataset.page;
    app.jumpPage(page);
  },
  bindOpen(){
    this.joinCart.show();
  }
})