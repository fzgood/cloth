// components/c-number/c-number.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    number:{
      type: Number,
      value: 1
    },
    size:{
      type:String,
      value: 'md'
    }
  },
  ready(){
  },
  /**
   * 组件的初始数据
   */
  data: {
    n:1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindReduce(){
      --this.data.number
    },
    bindPlus(){
      ++this.data.number
    }
  }
})
