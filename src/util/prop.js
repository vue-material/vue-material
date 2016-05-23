import fn from './fn'
import { typeOf, isObject, isFunction, isArray } from './type'

let {map} = fn
/**
 * 此函数用于简化组件prop属性的编写
 * @param {Object} propObj
 * @param {String} propObj的key 组件的属性
 * @param {Any} proObj的value 可以是默认值,也可以是数据类型
 * @example
 *  defaultProps({
 *    name:String,
 *    color:'red'
 *  })
 *  => {
 *    name:{
 *      type:String
 *    },
 *    color:{
 *      default:'red',
 *      type:String
 *    }
 *  }
 *
 */
export function defaultProps (propObj) {
  return map(propObj, (key, value) => {
    let result
    if (isObject(value)) {
      //判断是普通对象还是vue的prop描述对象
      if (value.type || value.default || value.validator || value.twoWay || value.required || value.coerce) {
        result = value
      } else {
        result = {
          type: Object,
          default: () => value
        }
      }
    } else {
      let type
      //判断value是否是[String,Number...]之一
      if (value
        && isFunction(value)
        && window[value.name]
        && /native code/.test(value.toString())) {
        type = value
      } else {
        type = typeOf(value)
      }
      result = {
        type,
        default: value
      }
    }
    return result
  })
}
/**
 *
 * @param {Array} valueList
 * @param {Any} defaultValue为valueList的值之一
 * @returns {Object}
 */
export function oneOf (valueList, defaultValue) {
  return {
    default: defaultValue,
    validator (value) {
      return ~valueList.indexOf(value)
    }
  }
}
export function oneOfType (typeList, defaultValue) {
  return {
    type: typeList,
    default: defaultValue
  }
}
export const any = {
  validator: function () {
    return true
  }
}
