const TYPE_REG = /\[object (.+)\]/
/**
 *
 * @param {String} value
 * @return {Function} value的类型
 * @example typeOf(3)=>Number
 */
function typeOf (value) {
  let type = Object.prototype.toString.apply(value).match(TYPE_REG)[1]
  return window[type]
}
function isType (type) {
  return value => typeOf(value) === type
}

export default {
  typeOf,
  isType,
  isNumber: isType(Number),
  isBoolean: isType(Boolean),
  isString: isType(String),
  isObject: isType(Object),
  isArray: isType(Array),
  isFunction: isType(Function)
}

