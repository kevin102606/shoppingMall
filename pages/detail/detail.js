// pages/detail/detail.js
import {
  getDetailData,
  ItemInfo,
  ShopInfo,
  DetailInfo,
  ParamInfo,
  getRecommendData
} from '../../service/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    itemInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommendInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const iid = options.iid
    this.setData({
      iid
    })
    this._getDetailData(this.data.iid)
    this._getRecommendData()
  },

  // 请求数据相关的方法
  _getDetailData(iid) {
    getDetailData(iid).then(res => {
      const data = res.result
      const topImages = data.itemInfo.topImages
      const itemInfo = new ItemInfo(data.itemInfo, data.columns, data.shopInfo.services)
      const shopInfo = new ShopInfo(data.shopInfo)
      const detailInfo = new DetailInfo(data.detailInfo)
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      let commentInfo = {}
      if (data.rate.cRate && data.rate.cRate !== 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        topImages,
        itemInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },

  _getRecommendData() {
    getRecommendData().then(res => {
      const recommendInfo = res.data.list
      this.setData({
        recommendInfo
      })
    })
  },

  // 事件监听相关的方法
  addCart() {
    const obj = {}
    obj.iid = this.data.iid
    obj.image = this.data.topImages[0]
    obj.title = this.data.itemInfo.title
    obj.desc = this.data.itemInfo.desc
    obj.price = this.data.itemInfo.realPrice
    app.addToCart(obj)
  }
})