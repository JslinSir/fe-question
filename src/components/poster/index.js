 

Component({
  properties: {
    // 是否分享
    isShare: {
      type: Boolean,
      value: true
    },
    
    // 模板所需参数
    config: {
      type: Object,
      value: null
    },
    // 二维码类型 默认小程序码，qrcode普通二维码
    qrcodeType: {
      type: String,
      value: 'wxaqrcode'
    },
    // 是否开启open-type分享
    isOpenType: {
      type: Boolean,
      value: false
    }
  },

  data: {
    share: null,
    // 分享配置
    paintPallette: null,
    toast: null,
    showPoster: false,
    // 生成后的海报地址
    posterImage: '',
    // 是否重新创建海报
    isAgainCeate: true, 
    // 分享码
    scene: null,
    // 分享page路径
    shareUrl: null,
    btnConfig: null,
    shareExternalConfig:null,
  },

  ready() {
 
    this.modal = this.selectComponent("#mp-modal")
  },
  
  methods: {

    /**
     * 创建分享卡片
     */
    async createShareCard(templateName, param) {
      this.templateName = templateName
      return new Promise(async (resolve, reject) => {
        try {
          const template = require(`./template/${templateName}`)
          const res = await template.paintPallette(param)
          this.setData({
            paintPallette: res.config, 
            share: res.share,
            btnConfig: res.btnConfig,
            shareExternalConfig: res.shareExternalConfig
          })
          this.resolve = resolve
        } catch (error) {
          resolve(null)
        }
      })
    },

    /**
     * 创建海报
     */
    async createPoster(templateName, param) {
      this.templateName = templateName
      
      try {
        const template = require(`./template/${templateName}`)
        const res = await template.paintPallette(param)
        this.setData({
          paintPallette: res.config, 
          share: res.share, 
          btnConfig: res.btnConfig,
          shareExternalConfig: res.shareExternalConfig
        })
      } catch (error) {
        console.log('创建海报错误：', error)
        wx.showToast({
          title: '生成海报失败，请稍后重试',
          icon:'none'
        })   
      }finally{
      
      }
      
    },

    _showToast(title) {
      wx.showToast({
        title,
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    },

    onImgOK(e) {
      const detail = e.detail
      if (this.resolve) {
        this.resolve(detail.path)
        this.resolve = null
        return
      }
      this.setData({showPoster: true, posterImage: detail.path, [`share.shareImageUrl`]: detail.path})
     
    },
    // 分享
    handleShare(e) {
      if (this.data.isOpenType) {
        return
      }
      this.triggerEvent('change', this.data.share)
    },
    // 隐藏海报
    handleHidePoster() {
      this.setData({
        showPoster: false
      })
    },
    // 保存
    handleSave(e) {
      const { posterImage } = this.data
      wx.saveImageToPhotosAlbum({
        filePath: posterImage,
        success: (res) => {
          this.setData({ showPoster: false }, () => {
            wx.showToast({
              title: '海报已保存相册，请在手机相册查看',
              icon:'none'
            })
         
          })
        },
        fail: (err) => {
          console.log(err)
          wx.showToast({
            title: '海报未保存',
            icon:'none'
          })
      
        }
      })
    },


  async handleFriendsOpen(){

    const { shareExternalConfig } = this.data
    if(shareExternalConfig.type === 'img'){
      console.log('不支持，无限分享 图片，请关闭配置 不显示该按钮')
    }else if(shareExternalConfig.type === 'mp'){
  

    }

    },

    // 分享好友
  async  handleFriends(){
 
      const { shareExternalConfig } = this.data
      if(shareExternalConfig.type === 'img'){
        const imgUrl = shareExternalConfig.imgUrl
      
      }else if(shareExternalConfig.type === 'mp'){
      

        console.log('res:',res)

      }
      
    },

    // 分享群
    handleGroup(){
      const { shareExternalConfig } = this.data
      if(shareExternalConfig.type === 'img'){
        const imgUrl = shareExternalConfig.imgUrl
       
      }else if(shareExternalConfig.type === 'mp'){
        
        

      }
    },
  }
})