

/**
 * 海报基础配置
 */
export default (height, ...config) => {
  return {
    width: `750rpx`,
    height: `${height}rpx`,
    background: '#fff',
    borderRadius: '20rpx',
    views: [
      ...config
    ]
  }
}


 
 