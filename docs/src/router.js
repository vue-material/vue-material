import Vue from 'vue'
import fn from 'vuejs-material/util/fn'
import VueRouter from 'vue-router'
import ComponentTemplate from './components/Component-Template.vue'
import NotFound from './components/Not-found.vue'

let {object, compose} = fn

let routes = [
  [
    'components/:component',
    {
      component: ComponentTemplate,
      subRoutes: {}
    }
  ],
  [
    '*',
    {
      component: NotFound
    }
  ]
]
function configRouter (router) {
  compose(
    router.map.bind(router),
    object
  )(routes)
}

Vue.use(VueRouter)

const router = new VueRouter({
  saveScrollPosition: true
})

configRouter(router)

window.router = router

export default router
