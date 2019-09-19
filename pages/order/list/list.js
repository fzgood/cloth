const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    tabIndex: 0,
    swiperHeight: 0,
    orderItems: [],
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin(()=>{
      this.getCategory();
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
  getCategory() {
    app.showLoading();
    app.$request.post('/order/getOrderStatusList').then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        var items = res.data;
        var category = [];
        var arr = [];
        for(var i = 0 , l = items.length;i<l;i++){
          let item = items[i];
          category.push(item.name);
          arr.push(Object.assign({}, item, {
            items: [],
            pageNum: 1,
            pageSize: 10,
            nextPage: true
          }))
        }
        this.setData({
          tabs: category,
          orderItems: arr
        }, ()=>{
          for(var i = 0, l = this.data.orderItems.length;i<l;i++){
            this.getData(i);
          }
        })
        app.hideLoading();
      }
    });
  },
  getData(index) {
    const i = index || this.data.tabIndex;
    app.$request.post(this.data.orderItems[i].url, {
      pageNum: this.data.orderItems[i].pageNum,
      pageSize: this.data.orderItems[i].pageSize,
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        let originArr = this.data.orderItems[i].items;
        const key = 'orderItems['+i+'].items'
        this.setData({
          [key]: originArr.concat(res.data.rows)
        })
        this.data.orderItems[i].pageNum = res.data.pageNum;
        this.data.orderItems[i].nextPage = res.data.nextPage;
      }
    })
  },
  bindDownLoad(){
    var index = this.data.tabIndex;
    if (this.data.orderItems[index].nextPage){
      this.getData();
    }
  }
})