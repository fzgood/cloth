const app = getApp()

Page({
  data: {
    store:{},
    items: []
  },
  onLoad: function (options) {
    /**
     * 分享出去的必须带上商铺ID 分享进来 打开获取得到
     */
    app.setStoreId(options.storeId)
    app.checkLogin(()=>{
      this.getStoreInfo();
      this.getItems()
    })
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
  bindJumpPage(e){
    const page = e.currentTarget.dataset.page;
    app.jumpPage(page);
  },
  getStoreInfo(){
    app.$request.get('/store').then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          store: res.data
        })
      }
    });
  },
  getItems(){
    app.$request.get('/goods/indexList').then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          items: res.data
        })
      }
    })
  }
})
