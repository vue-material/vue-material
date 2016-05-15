<template>
  <svg v-style="styles.icon"
       @click="handleClick($event)"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave">
    <slot></slot>
  </svg>
</template>
<script type="text/babel">
  import '../../directives'
  import styleUtil from '../../styles/util'

  export default {
    props: {
      onClick: {
        type: Function,
        default: () => {}
      },
      onMouseEnter: {
        type: Function,
        default: () => {}
      },
      onMouseLeave: {
        type: Function,
        default: () => {}
      },
      style: [Object, Array]
    },
    computed: {
      styles () {
        return {
          icon: styleUtil.mergeStyle({
            backgroundColor: 'initial',
            width: 24,
            height: 24,
            display: 'inline-block'
          }, this.style)
        }
      }
    },
    methods: {
      handleClick ($event) {
        if (this.href) {
          window.location = this.href
        }
      },
      handleMouseEnter () {
        this.onMouseEnter()
      },
      handleMouseLeave () {
        this.onMouseLeave()
      }
    }
  }
</script>
