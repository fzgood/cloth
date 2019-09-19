const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id
    }, ()=>{
      app.checkLogin(() => {
        this.getDetail();
      })
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

  },
  /**
   * 获取详情
   */
  getDetail(){
    app.$request.post('/order/detail', {
      id: this.data.id
    }).then(res=>{
      var detail = res.data;
      for (var i = 0, l = detail.orderLineVoList.length ; i<l ;i++){
        var item = detail.orderLineVoList[i];
        item.productVo.attrArr = item.productVo.attrName.split(' ');
      }
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          detail: res.data
        })
      }
    });
  }
})