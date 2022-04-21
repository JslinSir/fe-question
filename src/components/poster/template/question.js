 
import baseConfig from './base' 

async function GetWxQrcode() {
  
  const wxQrcodeUrl =  'https://image.sce-icm.com/sit/zj-mall/img/20210820/sce-icm-picture-mini-1629445330001.jpg'

  return {  wxQrcodeUrl }
}

/**
 * 海报配置
 */
export async function paintPallette(param) {
  const shareConfig = await GetWxQrcode()
  let height = 1110

  const config = [
    {
      type: 'image',
      url: '/images/share-poster.png',
      css: {
        width: '750rpx',
        height: '320rpx',            
        borderRadius:'20rpx'
      }
    },
    {
      type: 'text',
      text: param.title,
      css: {
        color: '#323232',
        fontSize:'32rpx',
        maxLines: 4,
        lineHeight:'48rpx',
        width: '640rpx',
        height: '260rpx',          
        top: '490rpx',
        left: '30rpx',
      }
    },
    // 内容名称
    {
      type: 'text',
      text: '一  前端问道',
      css: {
        color: '#323232',
        width: '640rpx',
        height: '40rpx',
        lineHeight: '38rpx',
        fontSize: '32rpx',
        top: '620rpx',
        left: '510rpx',
      }
    },
 
    // 小程序码
    {
      type: 'image',
      url: shareConfig.wxQrcodeUrl,
      css: {
        bottom: '140rpx',
        left: '520rpx',
        width: '160rpx',
        height: '160rpx'
      }
    },
    {
      type: 'text',
      text: '长按识别查看',
      css: {
        bottom: '83rpx',
        left: '510rpx',
        fontSize: '28rpx',
        color: '#999999'
      }
    }
  ]

  return {
    share: {

    },
    // 分享按配置
    btnConfig: {
      wxfriends:true,
      // 保存海报
      save: true
    },
    config: baseConfig(height, shareConfig.shareHeaderImage, ...config)
  }
}