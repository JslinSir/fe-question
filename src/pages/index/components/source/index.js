import Storage from '../../../../utils/storage'
import {
  getNodeRectFromComponent
} from '../../../../utils/nodeRef'
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
    groupArray: [],
    originData: [],
    curentName: '',
    height: 0,
  },

  lifetimes: {
    attached() {
      wx.showLoading()
      const groupArray = Storage.getData('groupArray')
      this.originData = Storage.getData('originData')
      this.len = this.originData.length
      this.setData({
        groupArray,
        originData: this.originData.slice(0, 10)
      },()=>{
        setTimeout(()=>{wx.hideLoading()},400)
      })
      setTimeout(() => {
        this.setData({
          originData: this.originData.slice(0, 20)
        })
      })
    },
    ready() {
      this.$pageScroll = this.selectComponent('#pageScrollId')
      this.getPopPositon()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 模拟生命周期展示
     */
    show(cb){
      typeof cb === 'function' && cb(this)
   
     },

    handleClickTabItem(e) {
      wx.showLoading()
      const {
        groupArray,
        originData
      } = this.data
      const {
        dataset: {
          name
        }
      } = e.currentTarget
      let curentArray = []
      if (name) {
        curentArray = groupArray.filter(({
          label
        }) => label === name)
        curentArray = curentArray[0].children
      } else {
        curentArray = originData
      }
      this.$pageScroll.scrollTop()
      this.setData({
        curentName: name,
        curentArray: curentArray
      },()=>{
        setTimeout(()=>{wx.hideLoading()},400)
      })

    },

    async getPopPositon() {
      const res = await getNodeRectFromComponent(this, '#slotId')
      const {
        screenHeight
      } = wx.getSystemInfoSync()
      const {
        bottom
      } = wx.getMenuButtonBoundingClientRect()
      this.setData({
        height: screenHeight - res.top - bottom - 20
      })

    },

    /**
     * 下拉刷新
     */
    handlePulling() {
      setTimeout(() => {
        this.$pageScroll.reset()
      }, 1000)
    },


    handleMore() {
      const {
        originData
      } = this.data
      if (originData.length === this.len) {
        return
      }
      wx.showLoading()
      this.setData({
        originData: this.originData
      },()=>{
        setTimeout(()=>{
          wx.hideLoading()
        },500)
      })
    },



  }
})
