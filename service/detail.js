import request from './network.js'

export function getDetailData(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}

export function getRecommendData() {
  return request({
    url: '/recommend'
  })
}

export class ItemInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells = shopInfo.cSells
    this.goods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class DetailInfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc,
    this.key = detailInfo.detailImage[0].key
    this.images = detailInfo.detailImage[0].list
  }
}

export class ParamInfo {
  constructor(info, size) {
    this.info = info.set
    this.size = size.tables
  }
}
