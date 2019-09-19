const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    remarks: '',
    defaulAddress: null,
    orderLineVoList: [],
    payObj: {},
    payId: '',
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin(() => {
      this.bindToSave();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#apply-box').fields({
      size: true,
    }, res => {
      this.setData({
        scrollHeight: res.height
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
  bindJumpPage(e){
    app.jumpPage(e.currentTarget.dataset.page);
  },
  /**
   * 选种商品结算
   */
  bindToSave() {
    app.showLoading();
    app.$request.post('/order/toSave').then(res => {
      app.hideLoading();
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        var payObj = {};
        for (var key in res.data.payTypeEnum) {
          payObj[key] = {
            id: key,
            name: res.data.payTypeEnum[key]
          }
        }
        this.setData({
          defaulAddress: res.data.defaulAddress,
          orderLineVoList: res.data.orderLineVoList,
          payObj: payObj
        }, ()=>{
          this.bindTogglePrice();
        })
      }
    });
  },
  /**
   * 切换支付方式
   */
  bindToggleType(e){
    const type = e.currentTarget.dataset.type;
    this.setData({
      payId: type
    })
  },
  bindTogglePrice(){
    var items = this.data.orderLineVoList;
    var price = 0;
    for(var i = 0 , l = items.length; i<l;i++){
      price += items[i].qty * items[i].productVo.price;
    }
    this.setData({
      totalPrice: price
    })
  },
  /**
   * 购物车
   */
  bindReduceCart(e){
    const index = e.currentTarget.dataset.index;
    var item = this.data.orderLineVoList[index];
    if(item.qty > 0){
      const key = 'orderLineVoList[' + index + '].qty';
      this.setData({
        [key]: item.qty - 1
      }, () => {
        this.bindTogglePrice();
      })
    }
  },
  bindPlusCart(e){
    const index = e.currentTarget.dataset.index;
    var item = this.data.orderLineVoList[index];
    const key = 'orderLineVoList['+index+'].qty';
    this.setData({
      [key]: item.qty+1
    }, ()=>{
      this.bindTogglePrice();
    })
  },
  bindInputCart(e) {
    const index = e.currentTarget.dataset.index;
    const number = Number(e.detail.value);
    var item = this.data.orderLineVoList[index];
    const key = 'orderLineVoList[' + index + '].qty';
    this.setData({
      [key]: number
    }, () => {
      this.bindTogglePrice();
    })
  },
  /**
   * 备注
   */
  bindInputRemarks(e){
    this.setData({
      remarks: e.detail.value
    })
  },
  /**
   * 支付
   */
  bindApply(){

    const orderLineList = this.data.orderLineVoList.map((item)=>{
      return {
        productId: item.productVo.id,
        qty: item.qty
      }
    })
    app.$request.post('/order/save', {
      order: {
        collectAddressId: this.data.defaulAddress.id,
        remarks: this.data.remarks
      },
      orderLineList: orderLineList
    }).then(res=>{
      console.log(res);
    });
  }
})