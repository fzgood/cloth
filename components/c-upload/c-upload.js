const app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 9
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindUpload(){
      wx.chooseImage({
        count: this.data.count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res=>{
          app.$request.uploadImage(res.tempFilePaths).then(res=>{
            this.triggerEvent('uploadOver', res)
          })
        }
      })
    }
  }
})
