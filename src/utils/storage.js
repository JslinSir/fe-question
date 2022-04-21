/**
 * 缓存，暂存
 */

class Storage {

  constructor() {
    this.data = {}
  }

  setData(key, data) {
    this.data[key] = data
  }

  getData(key) {
    return this.data[key]
  }


  remove() {
    this.data = {}
  }

}

module.exports = new Storage()

 
