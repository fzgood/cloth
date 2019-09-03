const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
   
  },
  bindJumpPage(e){
    const page = e.currentTarget.dataset.page;
    app.jumpPage(page);
  }
})
