import Vue from 'vue'
import router from './router'
import App from './components/App.vue'

require('es6-promise').polyfill()

import './style/index.less'

Vue.config.debug = true

router.start(Vue.extend(App), '#root')
