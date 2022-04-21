
Component({
 
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type:Number,
      value:0,
    },
    background:{ //刷新的背景色
      type:String,
      value:"#f6f6f6",
    },
    // 是否可以下拉
    pullRefresh:{
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pullStatus:true,
    loadMore:false,
    scrollTop:'',
  },

  attached(){
     if(this.properties.height){
        this.setData({height:this.properties.height})
     }else{
      const { screenHeight,safeArea:{ top } } = wx.getSystemInfoSync()
      const { bottom } = wx.getMenuButtonBoundingClientRect()
      this.setData({height:screenHeight-top-bottom})
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉
    handlePull:function(e){
      console.log('pull',e)
      this.triggerEvent("onPull",e)
    },
    // 触发
    handleRefresh(e){
      if (this._freshing) return
      this.triggerEvent("onPulling",e)
    
    },
    handleRestore(e){
      this.triggerEvent("onRestore",'')
      console.log('复位',e)
    },
    handleAbort(e){
      this.triggerEvent("onAbort",e)
      console.log('中断',e)
    },

      // 滚动到顶部
   scrollTop(){

    this.setData({ scrollTop:0 })

  },
	
    // 上拉触底
    handleMore(e){
      if(!this.loading){
        console.log('上拉触底',e)
        this.setData({loadMore:true},()=>  this.triggerEvent("onLoadMore",e))
        
      }
     
    },

    reset(){
      this.setData({
        pullStatus:false,
      },()=>{
  
      })
    }


  }
})
