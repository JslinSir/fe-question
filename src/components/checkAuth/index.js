import Storage from '../../utils/storage'

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
    show:false,
    logo:'<前端问道/>'
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
     init(){
      const res = Storage.getData('userInfo')
      if(!res){
        setTimeout(()=>{
          this.show()
        },600)
     
      }
     },

     show(){
        this.setData({show:true})
     },
     hide(){
      this.setData({show:false})
     },

     handleAuth(){
      wx.getUserProfile({
        desc: '用于完善用户信息',  
        success: (res) => {
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
          Storage.setData('userInfo',res.userInfo)
          this.hide()
        },
        fail:()=>{
          this.hide()
        }
      })
     },
  }
})
