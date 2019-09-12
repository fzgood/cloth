const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuItems: [],
    menuIndex: 0,
    scrollHeight: 0,
    productItems: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.createSelectorQuery().select('#product-main__box').fields({
      size: true,
    }, res => {
      this.setData({
        scrollHeight: res.height
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      menuItems: ['14mm', '15mm', '16mm', '17mm', '18mm', '19mm', '20mm', '21mm', '22mm', '23mm', '24mm', '25mm', '26mm', '27mm', '28mm', '29mm', '30mm', '31mm',],
      productItems: 10,
      wheelItems: ['单轮', '双轮', '三轮', '四轮', '导轨轮', '高轨轮', '风车轮', '窄边轮'],
      levelStatus: false
    })
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
    app.jumpPage(e.currentTarget.dataset.page);
  },
  bindscroll(e){
    if (e.currentTarget.offsetTop> 100){
      this.setData({
        scrollTop: 234
      })
    }else{
      this.setData({
        scrollTop: 0
      })
    }
  },
  bindImageLoad(e){
    console.log(e);
  },
  bindToggleLevel(e){
    this.setData({
      levelStatus: !this.data.levelStatus
    })
  },
  bindSelectLevel(e){
    this.setData({
      levelStatus: false
    })
  }
})