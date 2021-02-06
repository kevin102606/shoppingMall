// pages/home/home.js
import {
  getHomeMultiData,
  getHomeGoodsData
} from '../../service/home.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    topPosition: 0,
    isShowBackTop: false,
    isShowTabControl: false,
    tabControlTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getHomeMultiData()
    this._getHomeGoodsData('pop')
    this._getHomeGoodsData('new')
    this._getHomeGoodsData('sell')
  },


  // 网络请求相关的方法
  _getHomeMultiData() {
    getHomeMultiData().then(res => {
      const banners = res.data.banner.list.map(item => item.image)
      const recommends = res.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getHomeGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getHomeGoodsData(type, page).then(res => {
      const list = res.data.list
      const goods = this.data.goods
      goods[type].list.push(...list)
      goods[type].page += 1
      this.setData({
        goods
      })
    })
  },

  // 事件监听相关的方法
  titleClick(e) {
    let currentType = ''
    switch (e.detail.currentIndex) {
      case 0:
        currentType = 'pop'
        break
      case 1:
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    }
    this.setData({
      currentType
    })
    this.selectComponent('.tab-control-outer').setCurrentIndex(e.detail.currentIndex)
    this.selectComponent('.tab-control-inner').setCurrentIndex(e.detail.currentIndex)
  },

  backTop() {
    this.setData({
      topPosition: 0,
      isShowBackTop: false,
      isShowTabControl: false
    })
  },

  loadMore() {
    this._getHomeGoodsData(this.data.currentType)
  },

  scrollPosition(e) {
    const position = e.detail.scrollTop
    const isShowBackTop = position > 1000
    if (isShowBackTop !== this.data.isShowBackTop) {
      this.setData({
        isShowBackTop
      })
    }

    const isShowTabControl = position > this.data.tabControlTop
    if (isShowTabControl !== this.data.isShowTabControl) {
      this.setData({
        isShowTabControl
      })
    }
  },

  imageLoad() {
    wx.createSelectorQuery().select('.tab-control-inner').boundingClientRect(rect => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  }
})