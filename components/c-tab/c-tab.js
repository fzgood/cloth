// components/c-tab/c-tab.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value: []
    },
    tabIndex:{
      type:Number,
      value: 0
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
    bindToggleTab(e){
      const index = e.currentTarget.dataset.index;
      if(this.data.tabIndex != index){
        this.triggerEvent('toggleTab', index)
      }
    }
  }
})
