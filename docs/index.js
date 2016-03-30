import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route'
import App from './components/app.vue'

require('es6-promise').polyfill()

import './style/index.less'

Vue.config.debug = true

// install router
Vue.use(VueRouter)

const router = new VueRouter({
  saveScrollPosition: true
})

configRouter(router)

router.start(Vue.extend(App), '#root')

window.router = router

