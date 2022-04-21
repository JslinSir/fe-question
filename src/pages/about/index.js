 

const LINK_OJ = {
  source:'https://github.com/haizlin/fe-interview',
  jslin:'https://github.com/JslinSir'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onReady(){
    this.$alert = this.selectComponent('#alerId')
  },

  async handleToGithub(e){
    const { dataset:{ type } } = e.currentTarget
   const res = await this.$alert.alert({title: ' ', okText: '复制链接',okColor:'#627efe', content: '很抱歉，由于个人版小程序，无法使用webView，还请您点击复制以后，使用浏览器打开链接'})
   if(res){
    wx.setClipboardData({  data: LINK_OJ[type], })
   }
  },
 
   

   
})