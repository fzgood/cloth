const app = getApp()

Page({
  data: {
    categorysItems: []
  },
  onLoad: function () {
   app.checkLogin(()=>{
     this.getCategory();
   })
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
  bindOpenSelect(e){
    const index = e.currentTarget.dataset.index;
    const items = this.data.categorysItems[index].sonList;
    const arr = items.map((item)=>{
      return item.name;
    })
    wx.showActionSheet({
      itemList: arr,
      success: (res)=> {
        app.jumpPage('/pages/product/list2/list2?id=' + items[res.tapIndex].id);
      }
    });
  },
  getCategory(){
    app.$request.post('/product/apiNoSession/categoryListIndex').then(res=>{
      if(res.code == app.globalData.RESPONSE_CODE.SUCCESS){
        this.setData({
          categorysItems: res.data
        })
      }
    });
  }
})
