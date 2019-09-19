const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: null,
    statusNumber: 0
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
    this.apply = this.selectComponent('#c-apply')
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
    app.showLoading();
    app.$request.post('/order/detail', {
      id: this.data.id
    }).then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        var detail = res.data;
        for (var i = 0, l = detail.orderLineVoList.length; i < l; i++) {
          var item = detail.orderLineVoList[i];
          item.productVo.attrArr = item.productVo.attrName.split(' ');
        }
        this.setData({
          detail: detail
        })
        this.getStatus(detail.orderStatus);
      }
      app.hideLoading();
    });
  },
  /**
   * 获取订单当前状态
   */
  getStatus(status){
    var statusNumber = 0;
    if(status>=20 && status<40){
      statusNumber = 1;
    } else if (status > 40 && status <= 70) {
      statusNumber = 50
    } else if (status > 70){
      statusNumber = 100;
    }
    this.setData({
      statusNumber: statusNumber
    })
  },
  bindApply(){
    this.apply.show();
  }
})