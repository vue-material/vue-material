let el2DataMap = new Map()
/**
 * value 为空时,为getter,否则为setter
 * @param el
 */
function elData (el, key, value) {
  if (!el2DataMap.get(el)) {
    el2DataMap.set(el, {})
  }
  let data = el2DataMap.get(el)
  if (value === undefined) {
    return data[key]
  } else {
    data[key] = value
  }
}
export default elData
