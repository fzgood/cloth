const app = getApp();
let pages = null;
let prevPage = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    pageNum: 1,
    pageSize: 100,
    items: [],
    selectShow: false,
    selectId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      selectId: options.selectId || ''
    })
    app.checkLogin(()=>{
      this.getItems();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#address-box').fields({
      size: true,
    }, res => {
      this.setData({
        scrollHeight: res.height
      })
    }).exec()

    pages = getCurrentPages();
    prevPage = pages[pages.length - 2];
    this.getPageInfo();
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
  bindJumpPage(e){
    const page = e.currentTarget.dataset.page;
    app.jumpPage(page);
  },
  getItems(){
    app.showLoading();
    return new Promise((resolve, reject)=>{
      app.$request.post('/memberAddress/myList', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      }).then(res => {
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
          this.setData({
            items: res.data
          }, ()=>{
            resolve();
          })
        }
        app.hideLoading();
      })
    })
    
  },
  bindRemoveItem(e){
    const index = e.currentTarget.dataset.index;
    app.showModal({
      title: '提示',
      content: '是否删除当前地址',
      success: res=> {
        if (res.confirm) {
          app.showLoading();
          app.$request.post('/memberAddress/delete', {
            id: this.data.items[index].id
          }).then(res=>{
            app.showToast({
              title: res.msg,
            })
            if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
              var items = this.data.items;
              items.splice(index, 1);
              this.setData({
                items: items
              })
            }
          });
        } 
      }
    })
  },
  getPageInfo(){
    if (prevPage.route === 'pages/order2/apply/apply'){
      this.setData({
        selectShow: true
      })
    }
  },
  bindSelect(e){
    const index = e.currentTarget.dataset.index;
    prevPage.setData({
      defaulAddress: this.data.items[index]
    }, ()=>{
      wx.navigateBack();
    })
    
  }
})