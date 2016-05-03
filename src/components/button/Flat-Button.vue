<template>
  <m-button
    :background-color="backgroundColor"
    :disabled="disabled"
    :hover-color="hoverColor"
    :label="label"
    :label-style="styles.label"
    :href="href"
    :on-blur="handleBlur"
    :on-keyboard-focus="handleKeyBoardFocus"
    :on-mouse-enter="onMouseEnter"
    :on-mouse-leave="onMouseLeave"
    :primary="primary"
    :ripple-color="rippleColor"
    :secondary="secondary"
    :style="styles.button">
    <slot name="before" slot="before"></slot>
    <slot name="after" slot="after"></slot>
    <slot></slot>
  </m-button>
</template>

<script type="text/babel">
  import mButton from './Button.vue'
  import color from 'color'
  import themeManager from '../../styles/theme-manager'
  import styleUtil from '../../styles/util'

  let muiTheme = themeManager.getTheme()
  let {buttonFilterColor} = muiTheme
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
      labelStyle: [Object, Array],

      href: String,

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
      style: [Object, Array]
    },
    data () {
      return {
        keyBoardFocus: false
      }
    },
    computed: {
      styles () {
        let hoverColor = this.hoverColor || color(buttonFilterColor).alpha(0.2).rgbString()
        let button = styleUtil.mergeStyle({
          backgroundColor: this.keyBoardFocus ? hoverColor : 'initial',
          ':hover': {
            backgroundColor: hoverColor
          }
        }, this.style)
        return {
          button,
          label: styleUtil.mergeStyle({}, this.labelStyle)
        }
      }
    },
    watch: {},
    methods: {
      handleKeyBoardFocus () {
        this.keyBoardFocus = true
      },
      handleBlur () {
        this.keyBoardFocus = false
      }
    },
    components: {
      mButton
    },
    ready () {
    }
  }
</script>
