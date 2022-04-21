const _app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes:{
    ready(){
      this.runSplash()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    splashStatus:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
     start(){
        this.setData({splashStatus:true})
     },
     runSplash(){
      setTimeout(()=>{
        this.setData({splashStatus:false})
        _app.globalData.splash = false
        this.triggerEvent('onClose')
      },2500)
     },
  }
})
