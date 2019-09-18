const app = getApp();
let cartsTimeout = {

}
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
    levelStatus: false,
    sumCount: 0,
    sumPrice: 0
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
    this.getListSum();
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
    if (this.data.gradeIndex !== index) {
      this.resetParmas();
      this.setData({
        levelStatus: false,
        gradeIndex: index
      })
      this.getData();
    }
  },
  /**
   * 切换分类
   */
  bindToggleCategory(e) {
    this.resetParmas();
    this.setData({
      categoryId: e.currentTarget.dataset.id
    })
    this.getData();
  },
  /**
   * 切换属性
   */
  bindToggleAttr(e){
    const attrId = e.currentTarget.dataset.id
    if (attrId !== this.data.attrId) {
      this.resetParmas();
      this.setData({
        attrId: attrId,
        gradeIndex: 0
      })
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
  bindPlusCart(e) {
    const index = e.currentTarget.dataset.index;
    var item = this.data.productItems[index];
    if (!item.productCart) {
      item.productCart = {
        qty: 1
      };
    } else {
      ++item.productCart.qty
    }
    var key = 'productItems[' + index + ']';
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
    var item = this.data.productItems[index];
    if (!item.productCart) {
      item.productCart = {
        qty: 0
      };
    } else {
      --item.productCart.qty
    }
    var key = 'productItems[' + index + ']';
    this.setData({
      [key]: item
    })
    this.bindSaveCart(item);
  },
  /**
   * 手动改变数量
   */
  bindInputCarts(e) {
    const index = e.currentTarget.dataset.index;
    var item = this.data.productItems[index];
    var key = 'productItems[' + index + ']';
    item.productCart.qty = Number(e.detail.value);
    this.setData({
      [key]: item
    })
    this.bindSaveCart(item);
  },
  /**
   * 保存到购物车
   */
  bindSaveCart(item){
    clearTimeout(cartsTimeout[item.id]);
    cartsTimeout[item.id] = setTimeout(()=>{
      app.$request.post('/productCart/save', {
        productId: item.id,
        qty: item.productCart.qty
      }).then(res=>{
        if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
          const data = res.data;
          if (data.isCheck == 0) {
            this.bindSetCheck(data.id);
          }else{
            this.getListSum();
          }
        }
      });
    }, 500)
  },
  /**
   * 加入购物车选中
   */
  bindSetCheck(id){
    app.$request.post('/productCart/setCheck', {
      id: id
    }).then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.getListSum();
      }
    });
  },
  getListSum() {
    app.$request.post('/productCart/myListSum').then(res => {
      if (res.code === app.globalData.RESPONSE_CODE.SUCCESS) {
        this.setData({
          sumCount: res.data.sumCount,
          sumPrice: res.data.sumPrice
        })
      }
    });
  },
})