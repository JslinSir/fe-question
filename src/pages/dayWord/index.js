import Storage from '../../utils/storage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    detail:null,
    loading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const { data,date } =  Storage.getData('TODAY_WORD')
     this.setData({
      detail: {
        smImg: data.picture, //小图
        img: data.picture2, //大图
        note: data.note, //文本
        content: data.content //翻译的文本
      },
      date,
    })
    setTimeout(()=>{
      this.setData({loading:false,iconShow:true})
    },1000)
  },


  onReady(){
    this.$pageScroll = this.selectComponent('#pageScrollId')
  },
 
 
   /**
   * 下拉刷新
   */
  handleRefresh(){
    setTimeout(()=>{
      this.$pageScroll.reset()
    },1000)
  },
 
  /**
   * 分享
   */
  async handleShare(){
    try {
      wx.showLoading()
      const { detail } = this.data
      await this.selectComponent('#poster').createPoster('banner', { 
        ...detail
       })
    } catch (error) {
      
    }finally{
      wx.hideLoading()
    }   
  },

 

  // 右上角分享
  onShareAppMessage() {
    const { detail } = this.data
    return {
      title: `${detail.note}`,
      imageUrl: detail.smImg,
      path: `/pages/index/index`
    }

  },
})