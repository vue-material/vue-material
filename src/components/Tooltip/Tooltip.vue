<template>
  <div v-style="styles.root">
    <slot></slot>
  </div>
</template>
<script type="text/babel">
  import { defaultProps } from '../../util/prop'
  export default{
    props: defaultProps({
      show: false
    }),
    data () {
      return {}
    },
    computed: {
      styles () {
        return {
          root: {
            position: 'absolute'
          }
        }
      }
    },
    methods: {},
    components: {},
    ready () {

    }
  }
</script>
