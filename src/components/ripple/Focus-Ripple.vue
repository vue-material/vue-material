<template>
  <div :class="classes.autoRipple">
    <div :class="classes.ripple" v-style="rippleStyle">

    </div>
  </div>
</template>

<script type="text/babel">
  import jss from 'jss'
  import '../../directives'
  let sheet = jss.createStyleSheet({
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
      animation: 'ripple 2s infinite'
    },
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
    }
  }).attach()
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
        classes: sheet.classes,
        rippleStyle: {}
      }
    },
    computed: {},
    methods: {
      getRippleStyle () {
        let computedStyle = window.getComputedStyle(this.$el)
        let [width, height] = [computedStyle.width, computedStyle.height].map(num => parseInt(num))
        let radius = Math.max(
          width / 2 - 5,
          height / 2 - 5,
          0
        )
        return {
          left: width / 2 - radius,
          top: height / 2 - radius,
          width: 2 * radius,
          height: 2 * radius,
          backgroundColor: this.rippleColor,
          opacity: this.opacity
        }
      }
    },
    ready () {
      this.rippleStyle = this.getRippleStyle()
    },
    components: {}
  }
</script>
