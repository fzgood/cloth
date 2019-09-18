const app = getApp();

var cartsTimeout = {
  
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    items: [],
    sumCount: 0,
    sumPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#carts-box').fields({
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
    app.checkLogin(() => {
      this.getData();
      this.getListSum();
    })
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
  getData(){
    app.$request.post('/productCart/myList').then(res=>{
      console.log(res);
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          items: res.data
        })
      }
    });
  },
  getListSum(){
    app.$request.post('/productCart/myListSum').then(res=>{
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          sumCount: res.data.sumCount,
          sumPrice: res.data.sumPrice
        })
      }
    });
  },
  bindSetCheck(e){
    const index = e.currentTarget.dataset.index;
    const item = this.data.items[index];
    const key = 'items['+index+'].isCheck';
    const url = item.isCheck == 1 ? '/productCart/setNotCheck' : '/productCart/setCheck';
    app.$request.post(url, {
      id: item.id
    }).then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          [key]: item.isCheck == 0 ? 1 : 0
        },()=>{
          this.getListSum();
        })
      }
    });
  },
  /**
   * 购物车商品数量增加
   */
  bindPlusCart(e) {
    const index = e.currentTarget.dataset.index;
    var item = this.data.items[index];
    var key = 'items[' + index + ']';
    ++item.qty;
    this.setData({
      [key]: item
    })
    this.bindSaveCart(item);
  },
  /**
   * 购物车商品数量减少
   */
  bindReduceCart(e) {
    const index = e.currentTarget.dataset.index;
    var item = this.data.items[index];
    var key = 'items[' + index + ']';
    if (item.qty>=2){
      --item.qty;
      this.setData({
        [key]: item
      })
      this.bindSaveCart(item);
    }
    
  },
  /**
   * 手动更改商品数量
   */
  bindInputCarts(e){
    const index = e.currentTarget.dataset.index;
    var item = this.data.items[index];
    var key = 'items[' + index + ']';
    var number = Number(e.detail.value);
    if (number) {
      item.qty = number;
      this.setData({
        [key]: item
      })
      this.bindSaveCart(item);
    }
  },
  bindSaveCart(item){
    clearTimeout(cartsTimeout[item.id]);
    cartsTimeout[item.id] = setTimeout(() => {
      app.$request.post('/productCart/save', {
        productId: item.productCid,
        qty: item.qty
      }).then(res => {
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
          this.getListSum();
        }
      });
    }, 500)
  },
  bindToggleAll(e){
    const flag = this.data.items.length == this.data.sumCount;
    const url = flag ? '/productCart/setNotCheckAll' : '/productCart/setCheckAll';
    app.$request.post(url).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.getListSum();
        var items = this.data.items;
        for (var i = 0, l = items.length;i<l;i++){
          items[i].isCheck = !flag;
        }
        this.setData({
          items: items
        })
      }
    });
  }
})