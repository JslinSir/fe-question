import Deliver from '../../utils/delivery'
import Storage from '../../utils/storage'
import { getDateVal } from '../../utils/utils'

const LINK_OJ = {
  source:'https://github.com/haizlin/fe-interview',
  jslin:'https://github.com/JslinSir'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    detail:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const detail = Deliver.getData()
    if(detail.releaseTime && !isNaN(Number(detail.releaseTime))){
      const {   year,  month, day } = getDateVal(detail.releaseTime)
      detail.releaseTime = `${year}-${month}-${day}`
    }
    this.setData({detail})
   setTimeout(()=>{
     this.setData({show:true})
   },1000)

  },
 
  onReady(){
    this.$alert = this.selectComponent('#alerId')
  },
 
  handleLike(){
    const { detail } = this.data
    const data = Storage.getData('my-loves-list') || []
    const curent  = data.findIndex(({ id })=> id == detail.id)
    if(curent>-1){
      wx.showToast({
        title: '该题目已经收藏啦，不可贪心哦~',
        icon:'none',
        duration:2000
      })
       return false
    }
    data.push(this.data.detail)
    Storage.setData('my-loves-list',data)
    wx.showToast({
      title: '收藏成功',
      icon:'none',
      duration:2000
    })
  },



  async handleToGithub(e){
    const { dataset:{ type } } = e.currentTarget
   const res = await this.$alert.alert({title: '温馨提示', okText: '复制链接',okColor:'#627efe', content: '很抱歉，由于个人版小程序，无法使用webView，还请您点击复制以后，使用浏览器打开链接'})
   if(res){
     const url = type === 'jslin' ? LINK_OJ[type] : `${LINK_OJ[type]}/issues${this.data.detail.issuesId}`
    wx.setClipboardData({  data: url, })
   }
  },
 

  /**
   * 邀请作答
   */
 async handleInvite(){
    try {
      wx.showLoading()
      const { detail } = this.data
      await this.selectComponent('#poster').createPoster('question', { 
        ...detail
       })
    } catch (error) {
      
    }finally{
      wx.hideLoading()
    }  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `${this.data.detail.title}`,
      imageUrl: '/images/share-poster.jpg',
      path: `/pages/index/index`
    }
  }
})