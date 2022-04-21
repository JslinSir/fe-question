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
    userInfo:null,
  },

  lifetimes:{
    ready(){
      this.$alert = this.selectComponent('#alerId')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  show(cb){
   const userInfo = Storage.getData('userInfo')
   this.setData({userInfo})
   typeof cb === 'function' && cb(this)

  },


    handleToAbout(){
      wx.navigateTo({
        url: '/pages/about/index',
      })
    },
    handleToMyGithub(){
      wx.navigateTo({
        url: '/pages/webview/index?type=github',
      })
    },
    /**
     * 跳转到鸡汤页面
     */
    handleToTodayWord(){
      wx.navigateTo({
        url: '/pages/dayWord/index',
      })
    },
    
    /**
     * 跳转我的收藏页面
     */
    handleToCollect(){
      wx.navigateTo({
        url: '/pages/collect/index',
      })
    },

    async handleToUp(){
      const res = await this.$alert.alert({title: '温馨提示', okText: '复制链接',okColor:'#627efe', content: '很抱歉，由于个人版小程序，无法使用webView，还请您点击复制以后，使用浏览器打开链接,进行投稿'})
      if(res){
       wx.setClipboardData({  data: `https://github.com/haizlin/fe-interview`, })
      }
    },
  }
})
