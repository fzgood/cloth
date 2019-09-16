const app = getApp();
let pages = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    id: '',
    detail: {
      addr: '',
      area: '',
      city: '',
      prov:'',
      person: '',
      tel: '',
      id: '',
      isDefault: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || ''
    })
    if(options.id){
      this.getDetail();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    pages = getCurrentPages();
    console.log(pages);
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  getDetail(){
    app.$request.post('/memberAddress/detail', {
      id: this.data.id,
    }).then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        var data = Object.assign(this.data.detail, res.data);
        var region = [data.prov, data.city, data.area]
        this.setData({
          detail: data,
          region: region
        })
      }
    })
  },
  bindSave(e){
    const data = e.detail.value;
    var url = this.data.id ? '/memberAddress/update' : '/memberAddress/save'
    app.$request.post(url,{
      memberAddress:{
        addr: data.addr,
        area: data.area[2],
        city: data.area[1],
        prov: data.area[0],
        person: data.person,
        tel: data.tel,
        id: this.data.id
      }
    }).then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        if (data.default) {
          this.bindSetDefault(res.data.id);
        } else {
          this.bindGoBack();
        }
      }
    })
  },
  bindSetDefault(id){
    app.$request.post('/memberAddress/default', {
      id: id
    }).then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.bindGoBack();
      }
    });
  },
  /**
   * 返回上一页并刷新
   */
  bindGoBack(){
    const prevPage = pages[pages.length-2];
    prevPage.getItems().then(res=>{
      wx.navigateBack();
    })
  }
})