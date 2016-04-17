<template>
  <div :class="classes.ripple">
    <div :class="classes.oneRipple" v-style="style" v-for="style in rippleList">

    </div>
    <div :class="classes.click" @click="onClick">

    </div>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import jss from 'jss'
  import fn from '../util/fn'
  let duration = 300
  let {log, nextAnimationFrame} = fn
  let sheet = jss.createStyleSheet({
    ripple: {
      position: 'absolute',
      overflow: 'hidden',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    click: {
      extend: 'ripple'
    },
    oneRipple: {
      position: 'absolute',
      borderRadius: '50%',
      transition: `all ${duration}ms linear`
    }
  }).attach()
  export default {
    data () {
      return {
        classes: sheet.classes,
        rippleList: []
      }
    },
    props: {
      /**
       * 按钮点击后波浪的颜色
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
    methods: {
      getRippleStyle ({clickX, clickY}) {
        let computedStyle = window.getComputedStyle(this.$el)
        let [width, height] = [computedStyle.width, computedStyle.height].map(num => parseInt(num))
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
          ...this.getRippleStyle({clickX: event.offsetX, clickY: event.offsetY})
        })
        let style = rippleList[rippleList.length - 1]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            style.transform = 'scale(1)'
            setTimeout(() => {
              rippleList.$remove(style)
            }, duration)
          })
        })
      }
    },
    components: {}
  }
</script>
