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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindToggleTab(e){
      const index = e.currentTarget.dataset.index;
      if(this.data.tabIndex != index){
        this.setData({
          tabIndex: e.currentTarget.dataset.index
        }, ()=>{
          this.triggerEvent('toggleTab', index)
        })
      }
    }
  }
})
