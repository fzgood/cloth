const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindJumpPage(e){
    const page = e.currentTarget.dataset.page;
    app.jumpPage(page);
  },
  bindOpenSelect(){
    wx.showActionSheet({
      itemList: ['天滑轮', '地滑轮'],
      success: (res)=> {
        console.log(res);
        app.jumpPage('/pages/product/list2/list2');
      }
    });
  }
})
