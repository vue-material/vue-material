export function configRouter (router) {
  router.map({
    'components/flat-button': {
      component: require('./components/components/Flat-Button.vue'),
      subRoutes: {}
    },
    'components/raised-button': {
      component: require('./components/components/raised-Button.vue'),
      subRoutes: {}
    },
    '*': {
      component: require('./components/Not-Found.vue')
    }
  })
}
