// components/c-image/c-image.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    flag: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    binderror(e){
      this.setData({
        imageUrl: '/images/lose.png'
      })
    }
  },
  ready(){
    this.setData({
      imageUrl: this.data.src
    })
  }
})
