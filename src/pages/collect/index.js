import Storage from '../../utils/storage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const list = Storage.getData('my-loves-list') || []
    console.log('list:',list)
    this.setData({list})
  },

  onReady(){
    this.$pageScroll = this.selectComponent('#pageScroll')
  },

  handlePulling(){
    setTimeout(() => {
      this.$pageScroll.reset()
    }, 1000)
  },

  

})