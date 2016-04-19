<style scoped>

</style>

<template>
  <button :class="[classes.button,buttonClass]"
          v-style="buttonStyle"
          @focus="handleFocus"
          @blur="handleBlur"
          @click="handleClick"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          tabindex="0"
          :disabled="disabled"
          v-hover-style="hoverStyle">
    <m-ripple :ripple-color="rippleColor" :show-focus-ripple="showFocusRipple"></m-ripple>
    <slot name="before"></slot>
    <label :class="classes.label" v-style="labelStyle">
      {{label}}
    </label>
    <slot name="after"></slot>
    <slot></slot>
  </button>
</template>

<script type="text/babel">
  import jss from '../../util/jss'
  import color from 'color'
  import '../../directives'
  import fn from '../../util/fn'
  import mRipple from '../ripple/Ripple.vue'
  import themeManager from '../../styles/theme-manager'
  let muiTheme = themeManager.getTheme()
  let buttonFilterColor = 'rgb(153, 153, 153)'
  let {log} = fn
  let tabPressed = false
  window.addEventListener('keydown', () => {
    tabPressed = true
  })
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
    /**
     * 命名slot,可选值有[before after],默认after
     * @example
     * <m-flat-button label="Default"><img /></m-flat-button>
     * 等价
     * <m-flat-button label="Default"><img slot="after" /></m-flat-button>
     *
     * <m-flat-button label="Default"><img slot="before" /></m-flat-button>
     */
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
       * 按钮内的文本
       */
      label: String,
      /**
       * 覆盖Button内label元素的样式
       *
       */
      labelStyle: Object,

      /**
       * 当元素通过键盘获取焦点时调用,此时按钮上会波浪效果
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
      },
      /**
       * 覆盖组件根元素的样式
       */
      style: Object
    },
    data () {
      return {
        classes: sheet.classes,
        showFocusRipple: false,
        tabPressed: false
      }
    },
    computed: {
      buttonClass () {
        return {
          disabled: this.disabled
        }
      },
      buttonStyle () {
        return Object.assign(
          {
            backgroundColor: this.showFocusRipple ? this.hoverColor : this.backgroundColor,
            color: this.getColor()
          },
          this.style
        )
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
      },
      handleBlur () {
        clearTimeout(this.focusTimeout)
        this.showFocusRipple = false
      },
      handleFocus () {
        //如果是鼠标事件触发的focus, 会先触发focus, 再触发click,为避免这种情况,延迟focus的执行
        //如果按下过Tab键,然后在Button上鼠标按下超过100ms,不是我们想要的结果
        this.focusTimeout = setTimeout(() => {
          if (tabPressed) {
            this.showFocusRipple = true
            this.onKeyboardFocus()
          }
        }, 100)
      },
      handleClick () {
        tabPressed = false
        clearTimeout(this.focusTimeout)
        this.showFocusRipple = false
      },
      handleMouseEnter () {
        this.onMouseEnter()
      },
      handleMouseLeave () {
        this.onMouseLeave()
      }
    },
    components: {
      mRipple
    },
    ready () {
    }
  }
</script>
