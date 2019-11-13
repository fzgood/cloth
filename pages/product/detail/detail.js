const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 分享出去的必须带上商铺ID 分享进来 打开获取得到
     */
    app.setStoreId(options.storeId )
    this.data.id = options.id;
    app.checkLogin(()=>{
      this.getDetail();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    /**
     * 分享出去的时候一定要带上商铺ID 不然用户打开 无法通过商铺ID 找到对应的商家
     */
    const storeId = wx.getStorageSync('storeId');
    return {
      path: `/pages/index/index${storeId}`
    }
  },
  getDetail() {
    app.$request.get('/goods/detail',{
      id: this.data.id
    }).then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          detail: res.data
        })
      }
    });
  }
})