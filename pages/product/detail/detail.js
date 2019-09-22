const app = getApp();
let prevPage = null;
let cartsTimeout = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    detail: null
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
    const pages = getCurrentPages();
    prevPage = pages[pages.length - 2];
    this.joinCart = this.selectComponent('#joinCart')
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
  getDetail() {
    app.$request.post('/product/apiNoSession/productDetail', {
      id: this.data.id
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          detail: res.data
        })
      }
    })
  },
  bindSaveCart(item) {
    clearTimeout(cartsTimeout[item.id]);
    cartsTimeout[item.id] = setTimeout(() => {
      app.$request.post('/productCart/save', {
        productId: item.id,
        qty: item.productCart.qty
      }).then(res => {
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
          const data = res.data;
          if (data.isCheck == 0) {
            this.bindSetCheck(data.id);
          }
        }
      });
    }, 500)
  },
  /**
   * 加入购物车选中
   */
  bindSetCheck(id) {
    return new Promise((resolve) => {
      app.$request.post('/productCart/setCheck', {
        id: id
      }).then(res => {
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
          resolve();
        }
      })
    })
  },
  bindJumpCart() {
    this.bindSetCheck(this.data.detail.id).then(res => {
      app.jumpPage('/pages/carts/carts', 3);
    });
  },
  bindCollect(e) {
    const flag = this.data.detail.collected;
    const url = flag ? '/common/collect/productCollectCancel' : '/common/collect/productCollect';
    app.$request.post(url, {
      id: this.data.detail.id
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          'detail.collected': !flag
        })
      }
    })
  },
  bindOpenApply() {
    this.joinCart.show();
  },
  bindGetNumber(e) {
    console.log(e);
    const number = e.detail;
    let detail = this.data.detail;
    if (!detail.productCart) {
      detail.productCart = {
        qty: number
      };
    } else {
      detail.productCart.qty += number
    }
    var key = 'productItems[' + this.data.index + ']';
    prevPage.setData({
      [key]: detail,
    })
    this.setData({
      detail: detail
    })
    this.bindSaveCart(detail);
  }
})