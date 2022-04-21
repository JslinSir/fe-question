import Deliver from '../../utils/delivery'

Page({
 
  data: {
    hotData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotData = Deliver.getData()
    this.setData({hotData})

  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `来前端问道，我们一起学习一起成长！`,
      imageUrl: '/images/share-banner.png',
      path: `/pages/index/index`
    }
  }
})