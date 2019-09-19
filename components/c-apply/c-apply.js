// components/c-apply/c-apply.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    price: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    payId: '',
    showMask: false,
    showBox:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindToggleType(e){
      const type = e.currentTarget.dataset.type;
      this.setData({
        payId: type
      })
    },
    show() {
      this.setData({
        showMask: true
      }, () => {
        setTimeout(() => {
          this.setData({
            showBox: true
          })
        }, 50)
      })
    },
    hide() {
      this.setData({
        showBox: false
      }, () => {
        setTimeout(() => {
          this.setData({
            showMask: false
          })
        }, 500)
      })
    }
  }
})
