import elData from './el-data'
export default {
  addEventListener (el, eventName, handler, useCapture) {
    el.addEventListener(eventName, handler, useCapture)
    return () => {
      el.removeEventListener(eventName, handler, useCapture)
    }
  },
  removeEventListener (el, eventName, handler, useCapture) {
    el.removeEventListener(eventName, handler, useCapture)
  },
  /**
   * 添加在某个元素之外的点击事件监听器
   * @param el
   * @param handler
   * @return {Function} 返回函数直接调用可以取消对当前事件的监听
   */
  addListenerForClickAway (el, handler, useCapture) {
    let fn = event => {
      if (!el.contains(event.target)) {
        handler && handler()
      }
    }
    let handlerQueue = elData(el, 'clickAway') || []
    handlerQueue.push([handler, fn])
    elData(el, 'clickAway', handlerQueue)
    document.addEventListener('click', fn, useCapture)
    return () => {
      document.removeEventListener('click', fn, useCapture)
    }
  },
  /**
   * 与addListenerForClickAway相反
   * @param el
   * @param handler
   */
  removeListenerForClickAway (el, handler, useCapture) {
    let handlerQueue = elData(el, 'clickAway') || []
    handlerQueue.forEach(item => {
      if (handler === item[0]) {
        document.removeEventListener('click', item[1], useCapture)
      }
    })
  }
}
