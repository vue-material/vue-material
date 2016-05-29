<template>
  <button v-style="styles.button"
          @focus="handleFocus"
          @blur="handleBlur"
          @click="handleClick($event)"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          tabindex="0"
          :disabled="disabled">
    <slot name="before"></slot>
    <label v-style="styles.label" v-if="label">
      {{label}}
    </label>
    <slot name="after"></slot>
    <slot></slot>
    <m-ripple
      :from-center="fromCenter"
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
  import { defaultProps, any, oneOf, oneOfType } from '../../util/prop'

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
    props: defaultProps({
      /**
       * 设为true禁用按钮
       */
      disabled: false,
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

      /**
       * 波浪效果是否从中心点开始
       */
      fromCenter: false,

      onClick: () => {},

      onBlur: () => {},
      /**
       * 当元素通过键盘获取焦点时调用,此时按钮上会波浪效果
       */
      onKeyboardFocus: () => {},
      /**
       * 鼠标进入元素的时候调用
       */
      onMouseEnter: () => {},
      /**
       * 鼠标离开元素的时候调用
       */
      onMouseLeave: () => {},
      /**
       * 设为true,按钮的颜色和主题的primaryTextColor保持一致
       */
      primary: false,
      /**
       * 设为true,按钮的颜色和主题的secondaryTextColor保持一致 primary设为true的时候忽略secondary属性
       */
      secondary: false,
      /**
       * 按钮点击后波浪的颜色
       */
      rippleColor: buttonFilterColor,
      /**
       * 覆盖组件根元素的样式
       */
      style: oneOfType([Object, Array])
    }),
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
      handleClick ($event) {
        if (this.href) {
          window.location = this.href
        }
        tabPressed = false
        clearTimeout(this.focusTimeout)
        this.showFocusRipple = false
        this.onClick($event)
      },
      handleMouseEnter (event) {
        this.onMouseEnter && this.onMouseEnter(event)
      },
      handleMouseLeave (event) {
        this.onMouseLeave && this.onMouseLeave(event)
      }
    },
    components: {
      mRipple
    },
    ready () {
    }
  }
</script>
