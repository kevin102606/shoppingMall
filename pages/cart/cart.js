// pages/cart/cart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    selectCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 第一次初始化加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 设置新添加商品的回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
    }

    // 设置修改商品的回调    
    app.changeGoodsState = (index, goods) => {
      // 修改某项选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 修改全部选中状态
      const isSelectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll
      })

      // 修改单选状态计算价格和数量
      this.calcData()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const goodsCount = this.calcCount()
    wx.setNavigationBarTitle({
      title: `购物车(${goodsCount})`,
    })
    // 进入购物车页面监听全选变化
    this.listenSelectAll()
    // 进入购物车页面计算价格和数量
    this.calcData()
  },

  // 点击全选修改状态
  selectAllClick() {
    console.log(1)
   if(this.data.cartList.length !== 0) {
     if (this.data.isSelectAll) {
       this.data.cartList.forEach(item => {
         item.checked = false
       })
       this.setData({
         cartList: this.data.cartList,
         isSelectAll: false
       })
     } else {
       this.data.cartList.forEach(item => {
         item.checked = true
       })
       this.setData({
         cartList: this.data.cartList,
         isSelectAll: true
       })
     }
   }
    // 修改全选按钮重新计算价格和数量
    this.calcData()
  },

  // 监听全选实时状态
  listenSelectAll() {
    const cartList = this.data.cartList
    const isSelectAll = (cartList.length > 0) && (cartList.filter(item => item.checked).length === cartList.length)
    if (isSelectAll !== this.data.isSelectAll) {
      this.setData({
        isSelectAll
      })
    }
  },

  // 计算选中价格和数量
  calcData() {
    const totalPrice = this.data.cartList.filter(item => item.checked).reduce((preVal, item) => preVal + item.price * item.count, 0).toFixed(2)
    const selectCount = this.data.cartList.filter(item => item.checked).reduce((preVal, item) => preVal + item.count, 0)
    this.setData({
      totalPrice,
      selectCount
    })
  },

  // 计算总数量 
  calcCount() {
    return this.data.cartList.reduce((preVal, item) => preVal + item.count, 0)
  }
})