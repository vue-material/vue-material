import Vue from 'vue'
import warn from '../util/warn'
/**
 * 验证theme是否是一个有效的主题
 * @param {Object}theme
 * @returns {boolean}
 */
function validateTheme (theme) {
  if (
    !theme ||
    typeof theme.primaryColor !== 'string' ||
    typeof theme.secondaryColor !== 'string' ||
    typeof theme.disabledColor !== 'string'
  ) {
    return false
  } else {
    return true
  }
}
function getRawTheme () {
  return {
    primaryColor: 'rgb(255, 64, 129)',
    secondaryColor: 'rgb(0, 188, 212)',
    disabledColor: 'rgba(0, 0, 0, 0.3)'
  }
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
