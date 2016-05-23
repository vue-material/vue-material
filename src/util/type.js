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
let isNumber = isType(Number)
let isArray = isType(Array)
let isBoolean = isType(Boolean)
let isString = isType(String)
let isObject = isType(Object)
let isFunction = isType(Function)
export {
  typeOf,
  isType,
  isNumber,
  isBoolean,
  isString,
  isObject,
  isArray,
  isFunction
}
