<template>
  <div>
    <header>
      <h1>Components</h1>
      <nav>
        <ul>
          <li>
            <a href="https://github.com/vue-material/vue-material">
              Github
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="main-wrapper">
      <nav>
        <ul>
          <li class="first" v-for="firstMenuItem in menu">
            <div>{{firstMenuItem.name}}</div>
            <ul v-if="firstMenuItem.children && firstMenuItem.children.length!==0">
              <li class="second" v-for="secondMenuItem in firstMenuItem.children">
                <div>
                  {{secondMenuItem.name}}
                </div>
                <ul v-if="secondMenuItem.children && secondMenuItem.children.length!==0">
                  <li :class="[classes.threeMenuItem,getMenuItemClass(thirdMenuItem)]"
                      v-for="thirdMenuItem in secondMenuItem.children">
                    <div>
                      <a :href="getPath(thirdMenuItem)" :class="classes.a">{{thirdMenuItem.name}}</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import menu from '../menu'
  import jss from '../../src/util/jss'
  import fn from '../../src/util/fn'
  let {copy} = fn
  let sheet = jss.createStyleSheet({
    threeMenuItem: {
      paddingLeft: 60,
      paddingTop: 20,
      paddingBottom: 20,
      '&.active': {
        backgroundColor: 'rgba(0, 0, 0, .2)'
      }
    },
    a: {
    }
  }).attach()

  function getMenu () {
    let menuCopy = copy(menu)

    /**
     *
     * @param {Array} menuList
     */
    function addActiveState (menuList) {
      if (menuList) {
        menuList.forEach(menuItem => {
          if (menuItem.path && window.location.hash.indexOf(menuItem.path) !== -1) {
            menuItem.active = true
          }
          addActiveState(menuItem.children)
        })
      }
    }

    addActiveState(menuCopy)
    return menuCopy
  }
  export default{
    data () {
      return {
        classes: sheet.classes,
        menu: getMenu()
      }
    },
    methods: {
      getPath (menuItem) {
        return '#' + menuItem.path
      },
      getMenuItemClass (menuItem) {
        return {
          active: window.location.hash.indexOf(menuItem.path) !== -1
        }
      }
    },
    components: {},
    ready () {
      window.addEventListener('hashchange', () => {
        this.menu = getMenu()
      })
    }
  }
</script>
