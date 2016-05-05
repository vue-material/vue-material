/**
 * 将数组格式的style转换为对象,如果style不是数组,不作任何处理返回style
 * @param {any} style
 * @return {Object}
 */
function toObject (style) {
  let result = {}
  if (Array.isArray(style)) {
    style = style.filter(item => typeof item === 'object')
    if (style.length > 0) {
      result = Object.assign.apply(null, style)
    }
  } else {
    result = style
  }
  return result
}
/**
 *
 * @param {Object} target
 * @param {Object|Array} source
 * 返回合并后的样式
 */
function mergeStyle (target, source) {
  let result = Object.assign({}, target, toObject(source))
  Object.keys(target).forEach(key => {
    if (typeof target[key] === 'object') {
      result[key] = Object.assign({}, target[key], result[key])
    }
  })
  return result
}
export default {
  mergeStyle,
  toObject
}
