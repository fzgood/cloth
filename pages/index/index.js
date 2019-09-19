const app = getApp()

Page({
  data: {
    categorysItems: []
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
})
