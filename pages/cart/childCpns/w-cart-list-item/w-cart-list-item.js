// pages/cart/childCpns/w-cart-list-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
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
    checkClick(e) {
      // 获取当前商品的index
      const index = e.currentTarget.dataset.index

      // 根据indexd查找对应的商品
      const goods = app.globalData.cartList[index]
      goods.checked = !goods.checked

      // 回调修改状态
      app.changeGoodsState(index, goods)
    }
  }
})