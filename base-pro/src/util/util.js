//对比时间大小
export function compareTime(nowDate,endDate) {
    let endTime = new Date(endDate),
    nowTime = new Date(nowDate);
    let beyondEndTime = nowTime - endTime;
    if(beyondEndTime>0){
        return false;
    }else {
        return true;
    }
  }
  //判断类型
  export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof Element) {
      return 'element'
    }
    return map[toString.call(obj)]
  }
  /**
   * 对象深拷贝
   */
  export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      // 不再具有下一层次
      return data
    }
    if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]))
      }
    } else if (type === 'object') {
      for (var key in data) {
        obj[key] = deepClone(data[key])
      }
    }
    return obj
  }

  export const getMySecretKey = (key)=>{
    const sKey = key.substring(0,key.indexOf("==")+2);
    return atob(sKey);
  }
  