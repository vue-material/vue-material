<template>
  <div class="auto" v-style="styles.autoRipple">
    <div v-style="styles.ripple">

    </div>
  </div>
</template>

<script type="text/babel">
  import jss from 'jss'
  import '../../directives'

  jss.createStyleSheet({}).attach()
  export default {
    props: {
      /**
       * 波浪的颜色
       */
      rippleColor: String,
      /**
       * 波浪的透明度
       */
      opacity: {
        type: Number,
        default: 0.2
      }
    },
    data () {
      return {
        ready: false
      }
    },
    computed: {
      styles () {
        let temp = {}
        if (this.ready) {
          let computedStyle = window.getComputedStyle(this.$el)
          let [width, height] = [computedStyle.width, computedStyle.height].map(num => parseInt(num))
          let radius = Math.max(
            width / 2 - 5,
            height / 2 - 5,
            0
          )
          temp = {
            left: width / 2 - radius,
            top: height / 2 - radius,
            width: 2 * radius,
            height: 2 * radius,
            backgroundColor: this.rippleColor,
            opacity: this.opacity
          }
        }
        return {
          autoRipple: {
            position: 'absolute',
            overflow: 'hidden',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          ripple: {
            position: 'absolute',
            borderRadius: '50%',
            animation: 'ripple 2s infinite',
            '@keyframes ripple': {
              from: {
                transform: 'scale(0.8)'
              },
              '50%': {
                transform: 'scale(1)'
              },
              to: {
                transform: 'scale(0.8)'
              }
            },
            ...temp
          }
        }
      }
    },
    methods: {},
    ready () {
      this.ready = true
    },
    components: {}
  }
</script>
