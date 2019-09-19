const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: '',
    person: '',
    job: '',
    tel: '',
    details: '',
    detailFileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoading();
    app.checkLogin(() => {
      app.hideLoading();
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
   * 发表需求
   */
  bindSaveForm(e){
    const data = this.data ;
    const obj = this.checkInfo(data);
    if (obj.flag){
      app.showLoading();
      app.$request.post('/productDemand/save', {
        productDemand: {
          companyName: data.companyName,
          person: data.person,
          job: data.job,
          tel: data.tel,
          details: data.details,
        },
        detailFileList: this.data.detailFileList
      }).then(res=>{
        app.showToast({
          title: res.msg
        })
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS){
          this.setData({
            companyName: '',
            person: '',
            job: '',
            tel: '',
            details: '',
            detailFileList: []
          })
        }
      });
    }else{
      app.showToast({
        title: obj.msg,
      })
    }
  },
  /**
   * 输入框
   */
  bindInput(e){
    const key = e.currentTarget.dataset.key;
    this.setData({
      [key]: e.detail.value
    })
  },
  /**
   * 清空单个输入框
   */
  bindClear(e){
    const key = e.currentTarget.dataset.key;
    this.setData({
      [key]: ''
    })
  },
  checkInfo(data){
    if (!data.person) {
      return {
        msg: '请填写姓名',
        flag: false
      }
    }
    if (!data.tel) {
      return {
        msg: '请填写联系方式',
        flag: false
      }
    }
    if (!data.details) {
      return {
        msg: '请填写需求',
        flag: false
      }
    }
    return {
      msg: '',
      flag: true
    }
  },
  bindUploadOver(e){
    const arr = e.detail.map(item=>{
      return {
        src: item
      }
    })
    this.setData({
      detailFileList: this.data.detailFileList.concat(arr)
    })
  },
  /**
   * 删除图片
   */
  bindRemoveImage(e){
    app.showModal({
      title: '删除',
      content: '是否删除当前图片',
      success: res=>{
        if (res.confirm) {
          const index = e.currentTarget.dataset.index;
          var items = this.data.detailFileList;
          items.splice(index, 1);
          this.setData({
            detailFileList: items
          })
        }
      }
    })
  },
  bindShowImage(e){
    const index = e.currentTarget.dataset.index;
    const arr = this.data.detailFileList.map((item)=>{
      return item.src
    })
    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  }
})