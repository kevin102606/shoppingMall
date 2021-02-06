// app.js
App({
  onLaunch() {
  },
  addToCart(obj) {
    console.log(obj)
    const oldGoods = this.globalData.cartList.find(item => item.iid === obj.iid)
    if(oldGoods) {
      oldGoods.count += 1
      wx.showToast({
        title: '商品数量+1',
        icon: 'none'
      })
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
      wx.showToast({
        title: '添加新的商品',
        icon: 'none'
      })
    }

// 购物车新增加商品的回调
if(this.addCartCallback) {
  this.addCartCallback()
}
  },
  globalData: {
    cartList: []
  },
})
