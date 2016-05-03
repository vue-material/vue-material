import Vue from 'vue'
import debug from '../util/debug'
import rawTheme from './rawTheme'
let {warn} = debug
/**
 * 验证theme是否是一个有效的主题
 * @param {Object}theme
 * @returns {boolean}
 */
function validateTheme (theme) {
  if (
    !theme
    || typeof theme.primaryColor !== 'string'
    || typeof theme.secondaryColor !== 'string'
    || typeof theme.disabledColor !== 'string'
  ) {
    return false
  } else {
    return true
  }
}
function getRawTheme () {
  return rawTheme
}
function setTheme (theme) {
  if (validateTheme(theme)) {
    Vue.prototype.muiTheme = theme
  } else {
    warn('theme对象不是一个有效的主题')
  }
}
function getTheme () {
  return Vue.prototype.muiTheme
}
// 安装默认主题
setTheme(getRawTheme())

export default {
  setTheme,
  getTheme,
  validateTheme,
  getRawTheme
}
