import Vue from 'vue'
import jss from '../util/jss'
import warn from '../util/warn'
import fn from '../util/fn'
let {object, compose} = fn
Vue.directive('hover-style', {
  deep: true,
  bind () {
  },
  update (value) {
    let el = this.el
    if (typeof value === 'string') {
      value = compose(
        object,
        item => item.split(':'),
        value => value.match(/[^;]+(?=;)/g)
      )(value)
    }
    if (typeof value === 'object') {
      if (this.sheet) {
        this.sheet.detach()
      }
      let sheet = this.sheet = jss.createStyleSheet({
        hover: {
          '&:hover': value
        }
      }).attach()
      el.classList.add(sheet.classes.hover)
    } else {
      warn(`style 类型不正确,要求 string|object,现在为${typeof value}`)
    }
  },
  unbind () {
    if (this.sheet) {
      this.sheet.detach()
    }
  }

})
