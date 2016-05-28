<template>
  <div v-style="styles.ripple">
    <m-focus-ripple v-if="showFocusRipple" :ripple-color="rippleColor" :opacity="opacity"></m-focus-ripple>
    <div v-style="style" v-for="style in rippleList">

    </div>
    <div v-style="styles.click" @click="onClick">

    </div>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import jss from 'jss'
  import fn from '../../util/fn'
  import mFocusRipple from './Focus-Ripple.vue'
  import { defaultProps, any, oneOf } from '../../util/prop'

  let duration = 2000
  let {nextAnimationFrame} = fn
  export default {
    props: defaultProps({
      /**
       * 按钮点击后波浪的颜色
       */
      rippleColor: String,
      /**
       * 波浪的透明度
       */
      opacity: 0.3,
      /**
       * 波浪效果是否从中心点开始
       */
      fromCenter: false,
      /**
       * 一个无需点击自动显示的波浪效果
       */
      showFocusRipple: false
    }),
    data () {
      return {
        rippleList: []
      }
    },
    methods: {
      getRippleStyle ({clickX, clickY}) {
        let computedStyle = window.getComputedStyle(this.$el)
        let [width, height] = [computedStyle.width, computedStyle.height].map(num => parseInt(num))
        if (this.fromCenter) {
          clickX = width / 2
          clickY = width / 2
        }
        let radius = Math.max(
          clickX,
          width - clickX,
          clickY,
          height - clickY
        )
        return {
          left: clickX - radius,
          top: clickY - radius,
          width: 2 * radius,
          height: 2 * radius
        }
      },
      onClick (event) {
        let {rippleList} = this
        rippleList.push({
          opacity: this.opacity,
          transform: 'scale(0)',
          backgroundColor: this.rippleColor,
          position: 'absolute',
          borderRadius: '50%',
          transition: `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms`,
          ...this.getRippleStyle({clickX: event.offsetX, clickY: event.offsetY})
        })
        let style = rippleList[rippleList.length - 1]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            style.transform = 'scale(1)'
            style.opacity = 0
            setTimeout(() => {
              rippleList.$remove(style)
            }, duration)
          })
        })
      }
    },
    computed: {
      styles () {
        let ripple = {
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
        return {
          ripple,
          click: ripple
        }
      }
    },
    components: {
      mFocusRipple
    }
  }
</script>
