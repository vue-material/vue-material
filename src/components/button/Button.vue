<style scoped>

</style>

<template>
  <button :class="[classes.button,buttonClass]" v-style="buttonStyle" v-hover-style="hoverStyle">
    <m-ripple :ripple-color="rippleColor"></m-ripple>
    <slot name="before"></slot>
    <label :class="classes.label">
      {{label}}
    </label>
    <slot name="after"></slot>
    <slot></slot>
  </button>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import jss from '../../util/jss'
  import color from 'color'
  import '../../directives/style'
  import '../../directives/hover-style'
  import fn from '../../util/fn'
  import mRipple from '../Ripple.vue'
  import themeManager from '../../styles/theme-manager'
  let muiTheme = themeManager.getTheme()
  let buttonFilterColor = 'rgb(153, 153, 153)'
  let {log} = fn
  let sheet = jss.createStyleSheet({
    button: {
      border: 'none',
      outline: 'none',
      position: 'relative',
      background: 'transparent',
      userSelect: 'none',
      '&.primary': {
        color: muiTheme.primaryColor
      },
      '&.secondary': {
        color: muiTheme.secondaryColor
      },
      '&.disabled': {
        backgroundColor: 'initial',
        pointerEvents: 'none'
      },
      borderRadius: 2,
      padding: 0,
      lineHeight: '36px'
    },
    label: {
      paddingLeft: 16,
      paddingRight: 16,
      fontSize: 14
    }
  }, {
    link: true
  }).attach()
  export default {
    props: {
      /**
       * 按钮的背景色
       */
      backgroundColor: String,
      /**
       * 设为true禁用按钮
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * 鼠标hover时的颜色
       */
      hoverColor: {
        type: String,
        default: color(buttonFilterColor).alpha(0.2).rgbString()
      },
      /**
       * linkButton为true的时候有效,链接的url
       */
      href: String,
      /**
       * 按钮内的文本
       */
      label: String,
      /**
       * 将label放在Button的slot之前或者之后,取值before,after
       */
      labelPosition: {
        type: String,
        default: 'after'
      },
      /**
       * 覆盖Button内label元素的样式
       *
       */
      labelStyle: Object,
      /**
       * 设为true的时候href属性生效
       */
      linkButton: Boolean,
      /**
       * 当元素通过键盘获取焦点时调用
       */
      onKeyboardFocus: {
        type: Function,
        default: fn.noop
      },
      /**
       * 鼠标进入元素的时候调用
       */
      onMouseEnter: {
        type: Function,
        default: fn.noop
      },
      /**
       * 鼠标离开元素的时候调用
       */
      onMouseLeave: {
        type: Function,
        default: fn.noop
      },
      /**
       * 设为true,按钮的颜色和主题的primaryTextColor保持一致
       */
      primary: {
        type: Boolean,
        default: false
      },
      /**
       * 按钮点击后波浪的颜色
       */
      rippleColor: {
        type: String,
        default: buttonFilterColor
      },
      /**
       * 设为true,按钮的颜色和主题的secondaryTextColor保持一致 primary设为true的时候忽略secondary属性
       */
      secondary: {
        type: Boolean,
        default: false
      }

    },
    data () {
      return {
        classes: sheet.classes
      }
    },
    computed: {
      buttonClass () {
        return {
          disabled: this.disabled
        }
      },
      buttonStyle () {
        return {
          backgroundColor: this.backgroundColor,
          color: this.getColor()
        }
      },
      hoverStyle () {
        return {
          backgroundColor: this.disabled ? '' : `${this.hoverColor} !important`
        }
      }
    },
    watch: {},
    methods: {
      getColor () {
        let color = ''
        if (this.disabled) {
          color = muiTheme.disabledColor
        } else if (this.primary) {
          color = muiTheme.primaryColor
        } else if (this.secondary) {
          color = muiTheme.secondaryColor
        }
        return color
      }
    },
    components: {
      mRipple
    },
    ready () {
    }
  }
</script>
