export default {
  noop () {},
  log (arg) {
    console.log(JSON.parse(JSON.stringify(arg)))
  },
  /**
   * 从此刻起的第二个动画帧执行fn
   * @param fn
   */
  nextAnimationFrame (fn) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(fn)
    })
  },
  /**
   * 将数组转换为对象
   * @param arr
   * @example
   * [['moe', 30], ['larry', 40], ['curly', 50]]
   * =>{moe: 30, larry: 40, curly: 50}
   */
  object (arr = []) {
    var o = {}
    arr.forEach(function (a) {
      o[a[0]] = a[1]
    })
    return o
  },
  compose (...fnList) {
    return arg => {
      return fnList.reverse().reduce((last, fn) => {
        return fn(last)
      }, arg)
    }
  },
  once (fn) {
    let run = false
    let result
    return (...args) => {
      if (run) {
        return result
      } else {
        run = true
        return (result = fn.apply(this, args))
      }
    }
  }
}
