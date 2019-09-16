const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['','',''],
    userInfo:{
      headFile: {
        src: 'asdfasdf.jpg'
      },
      member: {
        nickName: '',
        addr: '',
        area: '',
        city: '',
        prov: '',
        birthday: '',
        email: '',
        tel: '13246765751',
        introduction: ''
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin(()=>{
      this.getUserInfo();
    })
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
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      'userInfo.member.birthday': e.detail.value
    })
  },
  bindUpload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        app.jumpPage(`/pages/upload/upload?src=${src}`);
      }
    })
  },
  bindSave(e){
    const data = e.detail.value;
    console.log(data);
    app.$request.post('/member/updateMember', {
      headFile: this.data.userInfo.headFile,
      member: {
        nickName: data.nickName,
        addr: data.addr,
        area: data.region[2],
        city: data.region[1],
        prov: data.region[0],
        birthday: data.birthday,
        email: data.email,
        tel: data.tel,
        introduction: data.introduction
      }
    }).then(res=>{
      console.log(res);
    })
  },
  getUserInfo(){
    app.$request.post('/member/memberDetail').then(res=>{
      if(res.code === app.globalData.RESPONSE_CODE.SUCCESS){
        console.log(res);
        var member = {
          nickName: res.data.nickName,
          addr: res.data.addr,
          area: res.data.area,
          city: res.data.city,
          prov: res.data.prov,
          birthday: res.data.birthday,
          email: res.data.email,
          tel: res.data.tel,
          introduction: res.data.introduction
        }
        var region = [member.prov, member.city, member.area]
        this.setData({
          'userInfo.member': member,
          region: region
        })
      }
    });
  }
})