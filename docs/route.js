export function configRouter (router) {
  router.map({
    'components/button': {
      component: require('./components/components/button.vue'),
      subRoutes: {}
    },
    '*': {
      component: require('./components/not-found.vue')
    }
  })
}
