import jss from 'jss'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import vendorPrefixer from 'jss-vendor-prefixer'
jss.use(camelCase())
jss.use(defaultUnit({unit: 'px'}))
jss.use(vendorPrefixer())
export default jss
