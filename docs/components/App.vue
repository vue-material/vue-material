<template>
  <div v-style="styles.root">
    <header v-style="styles.header">
      <h1 v-style="styles.header.h1">Components</h1>
      <nav v-style="styles.header.nav">
        <ul>
          <li>
            <a v-style="[styles.header.a,styles.a]" href="https://github.com/vue-material/vue-material">
              Github
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div v-style="styles.main">
      <nav v-style="styles.main.nav">
        <ul>
          <li v-for="firstMenuItem in menu">
            <m-button :label="firstMenuItem.name"
                      :label-style="styles.getMenuLabelStyle(1)"
                      :style="[styles.getMenuNameStyle()]"></m-button>
            <ul v-if="firstMenuItem.children && firstMenuItem.children.length!==0">
              <li v-for="secondMenuItem in firstMenuItem.children"
                  v-style="[styles.main.secondMenu]">
                <div @click="handleClick(secondMenuItem)">
                  <m-button :label="secondMenuItem.name"
                            :label-style="styles.getMenuLabelStyle(2)"
                            :style="[styles.getMenuNameStyle(secondMenuItem)]"></m-button>
                </div>
                <ul v-if="secondMenuItem.children && secondMenuItem.children.length!==0">
                  <li v-for="thirdMenuItem in secondMenuItem.children">
                    <div @click="handleClick(thirdMenuItem)">
                      <m-button :label="thirdMenuItem.name"
                                :label-style="styles.getMenuLabelStyle(3)"
                                :style="[styles.getMenuNameStyle(thirdMenuItem)]"></m-button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div v-style="styles.right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import menu from '../menu'
  import jss from '../../src/util/jss'
  import fn from '../../src/util/fn'
  import mButton from '../../src/components/button/Flat-Button'

  let {copy} = fn
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
        menu: getMenu()
      }
    },
    methods: {
      getPath (menuItem) {
        return '#!' + menuItem.path
      },
      handleClick (menuItem) {
        if (menuItem.path) {
          setTimeout(() => {
            window.location.hash = this.getPath(menuItem)
          }, 200)
        }
      }
    },
    computed: {
      styles () {
        let headerHeight = 64
        let leftNavWidth = 256
        return {
          root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          },
          header: {
            height: headerHeight,
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#00bcd4',
            padding: '0 24px',
            width: '100%',
            color: 'white',
            top: 0,
            zIndex: 1,
            h1: {
              flex: 1,
              fontSize: 24,
              fontWeight: 400
            },
            nav: {
              marginRight: 48
            },
            a: {
              color: 'white'
            }
          },
          main: {
            marginTop: headerHeight,
            display: 'flex',
            flex: 1,
            position: 'relative',
            nav: {
              width: leftNavWidth,
              boxShadow: 'black -2px 0 10px'
            }
          },
          right: {
            flex: 1,
            padding: 15
          },
          a: {
            textDecoration: 'none',
            color: 'black'
          },
          getMenuLabelStyle (menuLevel) {
            return {
              marginLeft: (menuLevel - 1) * 20
            }
          },
          /**
           *
           * @param {Number} menuLevel 菜单级别
           * @return 返回样式
           */
          getMenuNameStyle (menuItem) {
            let backgroundColor = 'initial'
            let hover = {}
            if (menuItem && menuItem.active) {
              backgroundColor = 'rgba(0, 0, 0, .2)'
              hover = {
                backgroundColor
              }
            }
            return {
              textAlign: 'left',
              borderRadius: 0,
              backgroundColor,
              padding: 2,
              width: '100%',
              ':hover': hover
            }
          }
        }
      }
    },
    components: {
      mButton
    },
    ready () {
      window.addEventListener('hashchange', () => {
        this.menu = getMenu()
      })
    },
    destroyed () {
    }
  }
</script>
