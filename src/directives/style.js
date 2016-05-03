import Vue from 'vue'
import jss from '../util/jss'
import debug from '../util/debug'
import event from '../util/event'
import styleUtil from '../styles/util'

let {toObject: styleArray2Object} = styleUtil
let {warn} = debug
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
    if (data.bindState && ['hover', 'disabled', 'focus'].indexOf(key) !== -1) {
      let {vm, path} = data.bindState
      vm.$set(path, value)
    }
  }
}

let styleDirective = {
  deep: true,
  bind () {
    let {el} = this
    el.getState = state => {
      return elData(el, state)
    }
    el.bindState = (vm, path) => {
      elData(el, 'bindState', {
        vm,
        path
      })
    }
  },
  update (value, oldValue) {
    let {el} = this
    if (typeof value === 'undefined') {
      return
    }
    if (typeof value === 'string') {
      el.style.cssText = value
    } else if (typeof value === 'object') {
      value = styleArray2Object(value)
      let finalStyle = jss.createRule(value).style
      for (let property in finalStyle) {
        if (typeof finalStyle[property] === 'string' || typeof finalStyle[property] === 'number') {
          el.style.setProperty(property, finalStyle[property])
        }
      }
    } else {
      warn(`style 类型不正确,要求 string|object,现在为${typeof value}`)
    }
  },
  unbind () {

  }
}
let hoverPlugin = {
  bind () {},
  update (style) {
    let {el} = this
    let removeMouseEnterHandler = elData(el, 'removeMouseEnterHandler')
    removeMouseEnterHandler && removeMouseEnterHandler()
    let removeMouseLeaveHandler = elData(el, 'removeMouseLeaveHandler')
    removeMouseLeaveHandler && removeMouseLeaveHandler()
    style = styleArray2Object(style)
    let hoverStyle = style ? style[':hover'] : {}
    if (!hoverStyle) {
      hoverStyle = {}
    }
    hoverStyle = styleArray2Object(hoverStyle)
    let finalHoverStyle = jss.createRule(hoverStyle).style
    let initialStyle = {}
    elData(el, 'removeMouseLeaveHandler',
      event.addEventListener(el, 'mouseenter', () => {
        elData(el, 'hover', true)
        for (let property in finalHoverStyle) {
          initialStyle[property] = el.style.getPropertyValue(property)
          window.requestAnimationFrame(() => {
            el.style.setProperty(property, finalHoverStyle[property])
          })
        }
      })
    )
    elData(el, 'removeMouseEnterHandler',
      event.addEventListener(el, 'mouseleave', () => {
        elData(el, 'hover', false)
        for (let property in initialStyle) {
          el.style.setProperty(property, initialStyle[property])
        }
      })
    )
  },
  unbind () {
    let {el} = this
    let removeMouseEnterHandler = elData(el, 'removeMouseEnterHandler')
    removeMouseEnterHandler && removeMouseEnterHandler()
    let removeMouseLeaveHandler = elData(el, 'removeMouseLeaveHandler')
    removeMouseLeaveHandler && removeMouseLeaveHandler()
  }
}
let keyFramesPlugin = {
  update (style) {
    let {el} = this
    style = style || {}
    let sheet = elData(el, 'sheet')
    sheet && sheet.detach()
    let keyFramesStyle = {}
    for (let property in style) {
      if (property.startsWith('@keyframes')) {
        keyFramesStyle[property] = style[property]
      }
    }
    if (Object.keys(keyFramesStyle).length > 0) {
      elData(el, 'sheet',
        jss.createStyleSheet(keyFramesStyle).attach()
      )
    }
  },
  unbind () {
    let {el} = this
    let sheet = elData(el, 'sheet')
    sheet && sheet.detach()
  }
}
let pluginList = []
pluginList.push(hoverPlugin)
pluginList.push(keyFramesPlugin)
function getFinalStyleDirective () {
  let finalStyleDirective = {
    ...styleDirective
  }
  let methodList = ['bind', 'update', 'unbind']
  methodList.forEach(method => {
    finalStyleDirective[method] = function (...args) {
      [...pluginList, styleDirective].forEach(item => {
        item[method] && item[method].apply(this, args)
      })
    }
  })
  return finalStyleDirective
}
Vue.directive('style', getFinalStyleDirective())
