import jss from 'jss'
import extend from 'jss-extend'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import vendorPrefixer from 'jss-vendor-prefixer'
import fn from './fn'
let {compose} = fn
let createStyleSheet = jss.createStyleSheet
jss.createStyleSheet = (...args) => {
  let sheet = createStyleSheet.apply(jss, args)
  let getRule = sheet.getRule
  sheet.getRule = ruleName => {
    let finalRuleName = ruleName
    if (ruleName.indexOf(':') !== -1) {
      finalRuleName = compose(
        arg => '.' + getRule.call(sheet, arg[0]).className + ':' + arg[1],
        ruleName => ruleName.split(':')
      )(ruleName)
    }
    return getRule.call(sheet, finalRuleName)
  }
  return sheet
}
jss.use(extend())
jss.use(nested())
jss.use(camelCase())
jss.use(defaultUnit({unit: 'px'}))
jss.use(vendorPrefixer())
export default jss
