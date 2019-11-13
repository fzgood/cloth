const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    searchShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin(()=>{
      this.getCategory()
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

  bindOpenSearch(){
    this.setData({
      searchShow: true
    })
  },
  bindJumpPage(e){
    app.jumpPage(e.currentTarget.dataset.page);
  },
  getCategory(){
    app.$request.get('/goods/categoryList').then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          categorys: res.data
        })
      }
    })
  }
})