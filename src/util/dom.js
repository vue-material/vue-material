/**
 * @method getNodeDocumentOffset
 * @description 得到节点与文档顶部之间的距离
 * @param {Node} node
 * @return {Object} result result.left、result.top
 */
function getNodeDocumentOffset (node) {
  let {left, top} = node.getBoundingClientRect()
  return {
    left: window.pageXOffset + left,
    top: window.pageYOffset + top
  }
}

/**
 * @method getNodeOffsetParentOffset
 * @description 得到节点与包含块之间的距离
 * @param {Node} node
 * @return {Object} result result.left、result.top
 */
function getNodeOffsetParentOffset (node) {
  var position = getNodeDocumentOffset(node)
  var offsetPosition = getNodeDocumentOffset(node.offsetParent)
  return {
    top: position.top - offsetPosition.top,
    left: position.left - offsetPosition.left
  }
}

export default {
  getNodeDocumentOffset,
  getNodeOffsetParentOffset
}
