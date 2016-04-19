<style>

</style>
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
                      <a :href="getPath(thirdMenuItem)">{{thirdMenuItem.name}}</a>
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

<script>
  import menu from '../menu'
  import jss from '../../src/util/jss'
  let sheet = jss.createStyleSheet({
    threeMenuItem: {
      paddingLeft: 60,
      paddingTop: 20,
      paddingBottom: 20,
      '&.active': {
        backgroundColor: 'rgba(0, 0, 0, .2)'
      }
    }
  }).attach()
  export default{
    data () {
      return {
        classes: sheet.classes,
        menu
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
    components: {}
  }
</script>
