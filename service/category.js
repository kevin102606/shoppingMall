import request from './network.js'

export function getCategoryMenuData() {
  return request({
    url: '/category'
  })
}

export function getSubcategoryData(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}

export function getSubcategoryDetailData(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
  
}