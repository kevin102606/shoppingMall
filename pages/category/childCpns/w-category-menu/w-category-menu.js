// pages/category/childCpns/category-menu/category-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryMenu: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      const currentIndex = e.currentTarget.dataset.index
      this.setData({
        currentIndex
      })
      this.triggerEvent('itemclick', {currentIndex}, {})
    }
  }
})
