/**
 * 页面参数传递
 */

let publicParam = []

/**
 * 存储需要传送的参数
 * @param {*} data 对应值
 */
function setData(data) {
  publicParam[0] = data
}

/**
 * 获取参数 获取
 * @param {*} key 
 */
function getData() {
  const value = publicParam[0]
  publicParam = []
  return value
}

export default {
  setData,
  getData
}