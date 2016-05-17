<template>
  <component :is="component">
  </component>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import fn from 'vuejs-material/util/fn'

  let {compose} = fn

  function first2UpperCase (str = '') {
    return str.charAt(0).toUpperCase() + str.substring(1)
  }
  export default{
    data () {
      return {
        component: null
      }
    },
    components: {},
    methods: {
      registerComponent () {
        let componentName = compose(
          arr => arr.join('-'),
          arr => arr.map(first2UpperCase),
          str => str.split('-'),
          str => str.substring(str.lastIndexOf('/') + 1)
        )(this.$route.params.component)
        let component = require('./page/' + componentName)
        let {components} = this.$options
        if (!components[componentName]) {
          //还没搞清楚问什么需要Vue.extend
          components[componentName] = Vue.extend(component)
        }
        this.component = componentName
      }
    },
    ready () {
      this.registerComponent()
      let {router} = window
      router.afterEach(this.registerComponent)
    }
  }
</script>
