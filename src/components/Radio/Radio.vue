<template>
  <div v-style="styles.root" @click="toggle">
    <div v-style="styles.circle">
      <div v-style="styles.internalCircle">
        <div v-style="style" v-for="style in rippleList"></div>
      </div>
    </div>
    <span v-style="styles.span">{{label}}</span>
  </div>
</template>
<script type="text/babel">
  import themeManager from '../../styles/theme-manager'
  import color from 'color'
  import fn from '../../util/fn'

  let muiTheme = themeManager.getTheme()
  let {primaryColor, disabledColor} = muiTheme
  let {nextAnimationFrame} = fn
  export default{
    props: {
      checked: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      disabled: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      label: String
    },
    data () {
      return {
        transform: '',
        rippleList: []
      }
    },
    computed: {
      styles () {
        let circleSize = 18
        let color
        if (this.disabled) {
          color = disabledColor
        } else if (this.checked) {
          color = primaryColor
        } else {
          color = 'black'
        }
        let internalCircle = {
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block'
        }
        return {
          root: {
            display: 'inline-flex'
          },
          circle: {
            borderRadius: '50%',
            width: circleSize,
            height: circleSize,
            backgroundColor: 'white',
            border: `2px solid ${color}`,
            display: 'inline-block'
          },
          internalCircle: {
            ...internalCircle,
            width: circleSize,
            height: circleSize,
            transform: this.transform || 'scale(0)',
            transition: 'all 200ms linear',
            position: 'relative'
          },
          ripple: {
            ...internalCircle,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          span: {
            alignSelf: 'center',
            marginLeft: 16
          }
        }
      }
    },
    methods: {
      toggle () {
        let duration = 500
        let {rippleList, styles} = this
        this.checked = !this.checked
        let finalTransform
        if (this.checked) {
          this.transform = 'scale(0)'
          finalTransform = 'scale(0.6)'
        } else {
          this.transform = 'scale(0.6)'
          finalTransform = 'scale(0)'
        }
        rippleList.push({
          ...styles.ripple,
          transform: 'scale(0)',
          transition: `all ${duration}ms linear`,
          opacity: 1
        })
        let style = rippleList[rippleList.length - 1]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            this.transform = finalTransform
            style.transform = 'scale(3)'
            style.opacity = 0
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
