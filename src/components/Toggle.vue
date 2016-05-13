<template>
  <div v-style="styles.root" @click="toggle">
    <div v-style="styles.circle">
      <div v-style="ripple" v-for="ripple in rippleList"></div>
    </div>
  </div>
</template>
<script type="text/babel">
  import themeManager from '../styles/theme-manager'
  import color from 'color'
  import fn from '../util/fn'

  let muiTheme = themeManager.getTheme()
  let {primaryColor} = muiTheme
  let {nextAnimationFrame} = fn
  let duration = 450
  export default{
    props: {
      toggled: {
        type: Boolean,
        twoWay: true,
        default: false
      }
    },
    data () {
      return {
        rippleList: []
      }
    },
    computed: {
      styles () {
        let [width, height] = [36, 14]
        let circleSize = 20
        let {toggled} = this
        let backgroundColor
        let circleBackgroundColor
        let left
        if (toggled) {
          backgroundColor = color(primaryColor).alpha(0.6).rgbString()
          circleBackgroundColor = primaryColor
          left = width - circleSize
        } else {
          backgroundColor = 'rgb(189, 189, 189)'
          left = 0//-circleRadius / 2
          circleBackgroundColor = '#F5F5F5'
        }
        let transition = `all ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`
        return {
          root: {
            borderRadius: height / 2,
            width,
            height,
            backgroundColor,
            position: 'relative',
            display: 'inline-block',
            transition
          },
          circle: {
            borderRadius: '50%',
            width: circleSize,
            height: circleSize,
            position: 'absolute',
            left,
            top: -(circleSize - height) / 2,
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 6px',
            backgroundColor: circleBackgroundColor,
            transition
          },
          ripple: {
            backgroundColor,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            transition
          }
        }
      }
    },
    components: {},
    methods: {
      toggle () {
//        let duration=
        let {rippleList, styles} = this
        this.toggled = !this.toggled
        rippleList.push({
          ...styles.ripple,
          transform: 'scale(0)',
          opacity: 1
        })
        let style = rippleList[rippleList.length - 1]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            style.transform = 'scale(2)'
            style.opacity = 0
            setTimeout(() => {
              rippleList.$remove(style)
            }, duration)
          })
        })
      }
    }
  }
</script>
