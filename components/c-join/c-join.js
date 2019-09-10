// components/c-join/c-join.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    buttonText: {
      type: String,
      value: '确认'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBox: false,
    showMask: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      console.log(1);
      this.setData({
        showMask: true
      }, ()=>{
        setTimeout(()=>{
          this.setData({
            showBox: true
          })
        }, 60)
      })
    },
    hide(){
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
