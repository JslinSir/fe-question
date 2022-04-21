 import Storage from '../../utils/storage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateListData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const { type } = options
     this.type = type === 'JavaScript' ? 'ECMAScript' : type
     wx.setNavigationBarTitle({  title: type || '' })
     this.getCateListData()
  },

   
 
  getCateListData(){
    if(this.type){
      wx.showLoading()
      const groupArray = Storage.getData('groupArray')
      const cateListData = groupArray.filter(({ label })=>{
         return label.toLocaleLowerCase() === this.type.toLocaleLowerCase()
      })
      this.setData({cateListData:cateListData[0].children},()=>{
         wx.hideLoading()
      })
    }

   
  },

  // 右上角分享
  onShareAppMessage() {

    return {
      title: `来前端问道，我们一起学习一起成长！`,
      imageUrl: '/images/share-banner.png',
      path: `/pages/index/index`
    }

  },

})