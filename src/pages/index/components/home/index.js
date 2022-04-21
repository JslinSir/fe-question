import { getDateVal, monthToEn } from '../../../../utils/utils'
import { getToDayHot, getTodayQuestion, getHotQuestion,} from '../../../../services/index'
import { CateConfig } from './config'
import Deliver from '../../../../utils/delivery' 
import Storage from '../../../../utils/storage'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    date: null,
    detail: null,
    cateConfig: CateConfig, // 分类
    todayData: [], // 今日数据
    hotData: [], //查询热门题目
  },

  lifetimes: {
    ready() {
      this.$pageScroll = this.selectComponent('#pageScroll')
    },
    attached() {
      this.loadData()
      this.getTodayQuestionData()
      this.getHotQuestionData()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    show(cb){
      typeof cb === 'function' && cb(this)
   
     },
    /**
     * 下拉刷新
     */
    handleRefresh() {
      setTimeout(() => {
        this.$pageScroll.reset()
      }, 1000)
    },

    /**
     * 跳转到今日鸡汤
     */
    handleToDayWord(){
      wx.navigateTo({
        url: '/pages/dayWord/index',
      })
    },
    /**
     * 跳转到热门
    */
    handleToHotPage() {
      Deliver.setData(this.data.hotData)
      wx.navigateTo({
        url: '/pages/hot/index',
      })
    },

    /**
     * 跳转到题库页面，并选中相关分类
     */
    handleClickSource(e){
     const { dataset:{ type } } = e.currentTarget
     this.triggerEvent('onSwitchTab',type)
    },


    handleToDetail(e){
      const { dataset:{ index } } = e.currentTarget
      const { todayData } = this.data
      Deliver.setData(todayData[index])
      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },

    /**
     * 跳转到搜索页面
     */
    handleSearch(){
      wx.navigateTo({
        url: '/pages/search/index',
      })
    },

    
    /**
     * 跳转到分类列表页面
     * @param {*} e 
     */
    handleClickToCateList(e){
      const { dataset:{ type } } = e.currentTarget
      wx.navigateTo({
        url: `/pages/cateList/index?type=${type}`,
      })
    },


    async loadData() {
      const { year, month, day } = getDateVal()
      const formateMonth = month > 9 ? month : `0${month}`
      const formateDay = day > 9 ? day : `0${day}`

      const { data } = await getToDayHot(`${year}-${formateMonth}-${formateDay}`)
      const date = { year, month: monthToEn(month),  day, }
      this.setData({
        detail: {
          smImg: data.picture, //小图
          img: data.picture2, //大图
          note: data.note, //文本
          content: data.content //翻译的文本
        },
        date,
      })
      Storage.setData('TODAY_WORD',{data,date})
     
    },

    /**
     * 查询今日题目
     */
    async getTodayQuestionData() {
      const res = await getTodayQuestion()
      const { result } = res.data
      this.setData({ todayData: result.today })
    },

    /**
     * 查询热门题目
     */
    async getHotQuestionData() {
      const res = await getHotQuestion()
      const { result } = res.data
      this.setData({ hotData: result })
    },

 

  }
})
