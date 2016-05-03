<template>
  <button v-style="styles.button"
          @focus="handleFocus"
          @blur="handleBlur"
          @click="handleClick"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          tabindex="0"
          :disabled="disabled">
    <slot name="before"></slot>
    <label v-style="styles.label">
      {{label}}
    </label>
    <slot name="after"></slot>
    <slot></slot>
    <m-ripple
      :ripple-color="rippleColor"
      :show-focus-ripple="showFocusRipple">
    </m-ripple>
  </button>
</template>

<script type="text/babel">
  import jss from '../../util/jss'
  import color from 'color'
  import '../../directives'
  import mRipple from '../ripple/Ripple.vue'
  import themeManager from '../../styles/theme-manager'
  import styleUtil from '../../styles/util'

  let muiTheme = themeManager.getTheme()
  let {buttonFilterColor} = muiTheme
  let tabPressed = false
  window.addEventListener('keydown', () => {
    tabPressed = true
  })
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
       * 设为true禁用按钮
       */
      disabled: {
        type: Boolean,
        default: false
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
       * 按钮点击时跳转的url地址
       */
      href: String,

      onBlur: {
        type: Function,
        default: () => {}
      },
      /**
       * 当元素通过键盘获取焦点时调用,此时按钮上会波浪效果
       */
      onKeyboardFocus: {
        type: Function,
        default: () => {}
      },
      /**
       * 鼠标进入元素的时候调用
       */
      onMouseEnter: {
        type: Function,
        default: () => {}
      },
      /**
       * 鼠标离开元素的时候调用
       */
      onMouseLeave: {
        type: Function,
        default: () => {}
      },
      /**
       * 设为true,按钮的颜色和主题的primaryTextColor保持一致
       */
      primary: {
        type: Boolean,
        default: false
      },
      /**
       * 设为true,按钮的颜色和主题的secondaryTextColor保持一致 primary设为true的时候忽略secondary属性
       */
      secondary: {
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
       * 覆盖组件根元素的样式
       */
      style: [Object, Array]
    },
    data () {
      return {
        showFocusRipple: false
      }
    },
    computed: {
      styles () {
        const {disabledColor, primaryColor, secondaryColor} = muiTheme
        let color = ''
        if (this.disabled) {
          color = disabledColor
        } else if (this.primary) {
          color = primaryColor
        } else if (this.secondary) {
          color = secondaryColor
        }
        return {
          button: styleUtil.mergeStyle({
            border: 'none',
            outline: 'none',
            position: 'relative',
            userSelect: 'none',
            backgroundColor: 'initial',
            color,
            pointerEvents: this.disabled ? 'none' : '',
            borderRadius: 2,
            padding: 0,
            lineHeight: '36px'
          }, this.style),
          label: styleUtil.mergeStyle({
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 14
          }, this.labelStyle)
        }
      }
    },
    watch: {},
    methods: {
      handleBlur () {
        clearTimeout(this.focusTimeout)
        this.showFocusRipple = false
        this.onBlur()
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
        if (this.href) {
          window.location = this.href
        }
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
