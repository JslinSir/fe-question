 
 
  /**
   * 获取组件内部节点位置信息（单个）
   * @param component 组件实例
   * @param selector {String} css选择器
   * @returns boundingClientRect() 回调函数的值
   */
  async function getNodeRectFromComponent (component, selector) {
    return await new Promise(resolve => {
      component
        .createSelectorQuery()
        .select(selector)
        .boundingClientRect(res => {
          resolve(res)
        })
        .exec()
    })
  }

  /**
   * 获取组件内部节点位置信息（多个）
   * @param component 组件实例
   * @param selector {String} css选择器
   * @returns boundingClientRect() 回调函数的值
   */
  async function getNodesRectFromComponent(component, selector) {
    return await new Promise(resolve => {
      component
        .createSelectorQuery()
        .selectAll(selector)
        .boundingClientRect(res => {
          resolve(res)
        })
        .exec()
    })
  }

  async function getNodeFieldsFromComponent(component, selector, fields) {
    return await new Promise(resolve => {
      component
        .createSelectorQuery()
        .select(selector)
        .fields(fields, res => {
          resolve(res)
        })
        .exec()
    })
  }


  /**
   * 获取当前页面实例
   */
 const getCuentPageRef = () =>{
  const page = getCurrentPages()
  const curentPage = page[page.length - 1]
  return curentPage
 }

 

 export {
  getNodeRectFromComponent,
  getNodesRectFromComponent,
  getNodeFieldsFromComponent,
  getCuentPageRef
 }
