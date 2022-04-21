const _Month_Config = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

/**
 * 月份转 英文缩写
 * @param {*} month 
 */
export const monthToEn = month => _Month_Config[month]


export const getDateVal = (val) => {

  const date = val ? new Date(Number(val)) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return {
    year,
    month,
    day
  }


}

export const getArrayClassification = (arr, Catekey, childrenKeyName) => {
  let map = {}
  let dest = []
  for (let i = 0; i < arr.length; i++) {
      let ai = arr[i];
      if (!map[ai[Catekey]]) {
          let obj = {}
          obj[Catekey] = ai[Catekey]
          obj[childrenKeyName] = [ai]
          dest.push(obj);
          map[ai[Catekey]] = ai;
      } else {
          for (let j = 0; j < dest.length; j++) {
              let dj = dest[j];
              if (dj[Catekey] == ai[Catekey]) {
                  dj[childrenKeyName].push(ai);
                  break;
              }
          }
      }
  }
  return dest
}
