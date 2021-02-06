// pages/category/category.js
import {
  getCategoryMenuData,
  getSubcategoryData,
  getSubcategoryDetailData
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryMenu: [],
    subcategoryData: [],
    subcategoryDetailData: [],
    currentIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getCategoryMenuData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  // 数据请求相关的方法
  _getCategoryMenuData() {
    getCategoryMenuData().then(res => {
      const categoryMenu = res.data.category.list
      const maitKey = categoryMenu[this.data.currentIndex].maitKey
      const miniWallkey = categoryMenu[this.data.currentIndex].miniWallkey
      this._getSubcategoryData(maitKey)
      this._getSubcategoryDetailData(miniWallkey, 'pop')
      this.setData({
        categoryMenu
      })
    })
  },

  _getSubcategoryData(maitKey) {
    getSubcategoryData(maitKey).then(res => {
      const subcategoryData = res.data.list
      this.setData({
        subcategoryData
      })
    })
  },

  _getSubcategoryDetailData(miniWallkey, type) {
    getSubcategoryDetailData(miniWallkey, type).then(res => {
      const subcategoryDetailData = res
      this.setData({
        subcategoryDetailData
      })
    })
  },

  // 事件监听相关的方法
  itemClick(e) {
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    const maitKey = this.data.categoryMenu[currentIndex].maitKey
    const miniWallkey = this.data.categoryMenu[currentIndex].miniWallkey
    this._getSubcategoryData(maitKey)
    this._getSubcategoryDetailData(miniWallkey, 'pop')
  }
})