

 import { getDateVal } from '../../utils/utils'
 import Deliver from '../../utils/delivery'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    questionData:{
      type:Object,
      value:{},
      observer:function(val){
        if(val){
          let releaseTime = val.releaseTime
          if(releaseTime && !isNaN(Number(releaseTime))){
            const {   year,  month, day } = getDateVal(releaseTime)
            releaseTime = `${year}-${month}-${day}`
          }
          this.setData({detail:{
            ...val,
            releaseTime
          }})
        }
      
      },
    },
  
  },

  /**
   * 组件的初始数据
   */
  data: {
     detail:{}
  },

  lifetimes:{
    ready(){
  
    }
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNewData(e,v){
     console.log('e:',e)
     console.log('v:',v)
    },

    handleToDetail(){
      Deliver.setData(this.data.detail)
      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },
  }
})
