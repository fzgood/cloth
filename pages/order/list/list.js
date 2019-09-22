const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待发货', '待收货'],
    tabIndex: 0,
    swiperHeight: 0,
    orderItems: [],
    items: []
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
    wx.createSelectorQuery().select('#order-box').fields({
      size: true,
    }, res => {
      this.setData({
        swiperHeight: res.height
      })
    }).exec()
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
  bindToggleTab(e) {
    this.setData({
      tabIndex: e.detail
    })
  },
  bindChange(e) {
    this.setData({
      tabIndex: e.detail.current
    })
  },
  
})