import Vue from 'vue'
import jss from '../util/jss'
import warn from '../util/warn'
Vue.directive('ripple', {
  update (value) {
    console.log(this.el)
    console.log(this.$el)
    let {el} = this
    el.addEventListener('click', () => {

    })
//    if (typeof value === 'string') {
//      el.style.cssText = value
//    } else if (typeof value === 'object') {
//      el.style.cssText = jss.createRule(value).toString().replace(RULE_REG, '')
//    } else {
//      warn(`style 类型不正确,要求 string|object,现在为${typeof value}`)
//    }
  }
})

