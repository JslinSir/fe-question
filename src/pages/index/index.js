
import { Tabs } from './config'
import Deliver from '../../utils/delivery'
import { getArrayClassification } from '../../utils/utils.js'
import { getCateQuestion } from '../../services/index'
import Storage from '../../utils/storage'

Page({
  data: {
    curentTabObj:{0:true},
    curentTab: 0,
    tabs: Tabs,
  },

  async onLoad() {
    //从持久化中获取我的收藏
    const myLoves = wx.getStorageSync('my-loves-list')
    // 写到内存中
    Storage.setData('my-loves-list',myLoves)
     //获取资源库
    this.getCateQuestionData()

    setTimeout(()=>{
      this.checkAuth()
    },3000)


  },

  checkAuth(){
    this.selectComponent('#checkAuthId').init()
  },

  handleTabChange(e) {
    const { curentTabObj } = this.data
    const { index: curentTab } = e.detail
    curentTabObj[curentTab] = true
    this.setData({ curentTab, curentTabObj}, () => {
      const $ = `#tab-${curentTab}`
      wx.setNavigationBarTitle({  title: Tabs[curentTab].name})
      this.selectComponent($) && this.selectComponent($).show(this.checkAuth)
    })
  },

  /**
   * tab 切换到 题库
   */
  handleSwitchTabSource(e) {
    const type = e.detail
    Deliver.setData(type)
    this.handleTabChange({
      detail: { index: 1 }
    })

  },




  // 右上角分享
  onShareAppMessage() {

    return {
      title: `来前端问道，我们一起学习一起成长！`,
      imageUrl: '/images/share-banner.png',
      path: `/pages/index/index`
    }

  },


  handleSplashClose() {
    wx.setNavigationBarTitle({  title: '首页'})
  },

  /**
  * 获取题目题库
  */
  async getCateQuestionData() {
    const res = await getCateQuestion()
    const { result } = res.data
    const groupArray = getArrayClassification(result,'label','children')
    Storage.setData('groupArray',groupArray)
    Storage.setData('originData',result)
  },

})
