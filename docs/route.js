import fn from '../src/util/fn'

let {object, compose} = fn
function first2UpperCase (str = '') {
  return str.charAt(0).toUpperCase() + str.substring(1)
}
let routes = [
  [
    'components/flat-button',
    {
      subRoutes: {}
    }
  ],
  [
    'components/raised-button',
    {
      subRoutes: {}
    }
  ],
  [
    'components/floating-action-button',
    {
      subRoutes: {}
    }
  ],
  [
    '*',
    {
      component: require('./components/Not-Found.vue')
    }
  ]
]
export function configRouter (router) {
  compose(
    router.map.bind(router),
    object,
    arr => arr.map(item => {
      let componentName = compose(
        arr => arr.join('-'),
        arr => arr.map(first2UpperCase),
        str => str.split('-'),
        str => str.substring(str.lastIndexOf('/') + 1)
      )(item[0])
      let componentPath = item[0].substring(0, item[0].lastIndexOf('/') + 1)
      return [
        item[0],
        {
          ...item[1],
          component: item[1].component || require('./components/' + componentPath + componentName)
        }
      ]
    })
  )(routes)
}
