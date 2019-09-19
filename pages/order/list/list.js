const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部订单','待付款','待收货','已收货'],
    tabIndex: 0,
    swiperHeight: 0,
    all: {
      items: [],
      pageNum: 1,
      pageSize: 10,
      nextPage: true
    },
    stay: {
      items: [],
      pageNum: 1,
      pageSize: 10,
      nextPage: true
    },
    collect: {
      items: [],
      pageNum: 1,
      pageSize: 10,
      nextPage: true
    },
    over: {
      items: [],
      pageNum: 1,
      pageSize: 10,
      nextPage: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin(()=>{
      app.showLoading();
      this.getAllOrder();
      this.getStayOrder();
      this.getCollectOrder();
      this.getOverOrder();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#order-box').fields({
      size: true,
    }, res=> {
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
  bindToggleTab(e){
    this.setData({
      tabIndex: e.detail
    })
  },
  bindChange(e){
    this.setData({
      tabIndex: e.detail.current
    })
  },
  getAllOrder() {
    app.$request.post('/order/myList_all', {
      pageNum: this.data.all.pageNum,
      pageSize: this.data.all.pageSize,
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        let originArr = this.data.all.items;
        this.setData({
          'all.items': originArr.concat(res.data.rows)
        })
        this.data.all.pageNum = res.data.pageNum;
        this.data.all.pageSize = res.data.pageSize;
        this.data.all.nextPage = res.data.nextPage;
      }
      app.hideLoading();
    })
  },
  getStayOrder() {
    app.$request.post('/order/myList_create', {
      pageNum: this.data.stay.pageNum,
      pageSize: this.data.stay.pageSize,
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        let originArr = this.data.stay.items;
        this.setData({
          'stay.items': originArr.concat(res.data.rows)
        })
        this.data.stay.pageNum = res.data.pageNum;
        this.data.stay.pageSize = res.data.pageSize;
        this.data.stay.nextPage = res.data.nextPage;
      }
    })
  }, 
  getCollectOrder() {
    app.$request.post('/order/myList_delivery_all', {
      pageNum: this.data.collect.pageNum,
      pageSize: this.data.collect.pageSize,
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        let originArr = this.data.collect.items;
        this.setData({
          'collect.items': originArr.concat(res.data.rows)
        })
        this.data.collect.pageNum = res.data.pageNum;
        this.data.collect.pageSize = res.data.pageSize;
        this.data.collect.nextPage = res.data.nextPage;
      }
    })
  },
  getOverOrder() {
    app.$request.post('/order/myList_finish', {
      pageNum: this.data.over.pageNum,
      pageSize: this.data.over.pageSize,
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        let originArr = this.data.over.items;
        this.setData({
          'over.items': originArr.concat(res.data.rows)
        })
        this.data.over.pageNum = res.data.pageNum;
        this.data.over.pageSize = res.data.pageSize;
        this.data.over.nextPage = res.data.nextPage;
      }
    })
  }
})