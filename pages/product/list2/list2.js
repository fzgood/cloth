const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    categoryItems: [],
    categoryId: '',
    attrList: [],
    attrId: '',
    scrollTop: 0,
    scrollHeight: 0,
    productItems: [],
    gradeItems: [],
    gradeIndex: 0,
    pageNum:1 ,
    pageSize: 10,
    nextPage: true,
    levelStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    app.checkLogin(()=>{
      this.getCategory().then(res=>{
        this.setData({
          categoryId: res[0].id
        }, ()=>{
          this.getData();
        });
      });
    })

    wx.createSelectorQuery().select('#product-main__box').fields({
      size: true,
    }, res => {
      this.setData({
        scrollHeight: res.height
      })
    }).exec()
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
  bindJumpPage(e){
    app.jumpPage(e.currentTarget.dataset.page);
  },
  bindscroll(e) {
    if (e.detail.scrollTop> 100){
      this.setData({
        scrollTop: 234
      })
    }else{
      this.setData({
        scrollTop: 0
      })
    }
  },
  bindImageLoad(e){
  },
  getCategory(){
    return new Promise((resolve, reject)=>{
      app.$request.post('/product/apiNoSession/categoryListProductList', {
        id: this.data.id
      }).then(res => {
        if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
          this.setData({
            categoryItems: res.data
          })
          resolve(res.data);
        }
      });
    })
  },
  getData(){
    app.showLoading();
    app.$request.post('/product/apiNoSession/productList', {
      categoryIdList: [this.data.categoryId],
      attrIdList: [this.data.attrId],
      brandIdList: [],
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      productFilter:{
        grade: this.data.gradeItems.length ? this.data.gradeItems[this.data.gradeIndex].id : ''
      }
    }).then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        if(this.data.pageNum === 1){
          var gradeItems = [{
            id: '',
            name: '全'
          }];
          for (var key in res.data.gradeMap){
            gradeItems.push({
              id: key,
              name: res.data.gradeMap[key]
            })
          }
          res.data.attrList.unshift({
            id: '',
            name: '全部'
          })
          this.setData({
            attrList: res.data.attrList,
            gradeItems: gradeItems
          })
        }
        var originArr = this.data.productItems;
        this.setData({
          productItems: originArr.concat(res.data.productGrid.rows),
          nextPage: res.data.productGrid.nextPage
        })
        this.data.pageNum = res.data.productGrid.pageNum;
      }
      app.hideLoading();
    });
  },
  /**
   * 切换档次
   */
  bindToggleLevel(e) {
    this.setData({
      levelStatus: !this.data.levelStatus
    })
  },
  bindSelectLevel(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.gradeIndex !== index){
      this.setData({
        levelStatus: false,
        gradeIndex: index
      })
      this.resetParmas();
      this.getData();
    }
  },
  /**
   * 切换分类
   */
  bindToggleCategory(e){
    this.setData({
      categoryId: e.currentTarget.dataset.id
    })
    this.resetParmas();
    this.getData();
  },
  /**
   * 切换属性
   */
  bindToggleAttr(e){
    const attrId = e.currentTarget.dataset.id
    if (attrId !== this.data.attrId){
      this.setData({
        attrId: attrId,
        gradeIndex: 0
      })
      this.resetParmas();
      this.getData();
    }
    
  },
  /**
   * 重置参数
   */
  resetParmas(){
    this.setData({
      nextPage: true,
      productItems: [],
      gradeIndex: 0,
    })
    this.data.pageNum = 1;
  },
  /**
   * 加入购物车
   */
  bindAddCart(e){
    const index = e.currentTarget.dataset.index;
    var item = this.data.productItems[index];
    if (!item.productCart){
      item.productCart = {
        qty: 1
      };
    }else{
      ++item.productCart.qty
    }
    var key = 'productItems['+index+']';
    this.setData({
      [key]: item
    })
    console.log(item.productCart.qty);
  }
})