<template>
  <m-button
    v-el:button
    :style="styles.button"
    :label-style="styles.label"
    :disabled="disabled"
    :label="label"
    :on-click="onClick"
    :on-blur="handleBlur"
    :on-keyboard-focus="handleKeyBoardFocus"
    :on-mouse-enter="onMouseEnter"
    :on-mouse-leave="onMouseLeave"
    :primary="primary"
    :ripple-color="styles.rippleColor"
    :secondary="secondary">
    <div slot="after" v-style="styles.overlay" v-show="button.hover||keyBoardFocus"></div>
    <slot name="before" slot="before"></slot>
    <slot name="after" slot="after"></slot>
    <slot></slot>
  </m-button>
</template>
<script type="text/babel">
  import jss from '../../util/jss'
  import mButton from './Button.vue'
  import color from 'color'
  import themeManager from '../../styles/theme-manager'
  import styleUtil from '../../styles/util'

  let muiTheme = themeManager.getTheme()

  export default{
    props: {
      backgroundColor: String,
      disabled: {
        type: Boolean,
        default: false
      },
      label: String,
      onClick: {
        type: Function,
        default: () => {}
      },
      onMouseDown: {
        type: Function,
        default: () => {}
      },
      onMouseUp: {
        type: Function,
        default: () => {}
      },
      onMouseEnter: {
        type: Function,
        default: () => {}
      },
      onMouseLeave: {
        type: Function,
        default: () => {}
      },
      onKeyBoardFocus: {
        type: Function,
        default: () => {}
      },
      primary: {
        type: Boolean,
        default: false
      },
      secondary: {
        type: Boolean,
        default: false
      },
      rippleColor: String,
      style: [Object, Array]
    },
    data () {
      return {
        button: {},
        keyBoardFocus: false
      }
    },
    computed: {
      styles () {
        const {
          primary,
          secondary
        } = this
        const opacity = (primary || secondary) ? 0.3 : 0.15
        const rippleOpacity = (primary || secondary) ? 0.5 : 0.25
        const {
          raisedButton
        } = muiTheme
        let backgroundColor = raisedButton.defaultColor
        let labelColor = raisedButton.defaultTextColor
        if (this.disabled) {
          backgroundColor = raisedButton.disabledColor
          labelColor = raisedButton.disabledTextColor
        } else if (this.primary) {
          backgroundColor = raisedButton.primaryColor
          labelColor = raisedButton.primaryTextColor
        } else if (this.secondary) {
          backgroundColor = raisedButton.secondaryColor
          labelColor = raisedButton.secondaryTextColor
        }
        return {
          label: styleUtil.mergeStyle(
            {
              color: labelColor
            },
            this.labelStyle
          ),
          button: styleUtil.mergeStyle(
            {
              backgroundColor,
              boxShadow: '0px 0px 5px rgba(0,0,0,0.2)'
            },
            this.style
          ),
          overlay: {
            backgroundColor: color(labelColor).alpha(opacity).rgbString(),
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: 2
          },
          rippleColor: color(labelColor).alpha(rippleOpacity).rgbString()
        }
      }
    },
    methods: {
      handleKeyBoardFocus () {
        this.keyBoardFocus = true
        this.onKeyBoardFocus()
      },
      handleBlur () {
        this.keyBoardFocus = false
      }
    },
    components: {
      mButton
    },
    ready () {
      this.$els.button.bindState(this, 'button.hover')
    }
  }
</script>
