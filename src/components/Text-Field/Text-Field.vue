<template>
  <div v-style="styles.root">
    <div v-style="styles.hintText">
      The hint text can be as long as you want, it will wrap.
    </div>
    <input type="text"
           v-el:input
           v-model="input"
           v-style="styles.input"
           @keydown="handleKeyDown"
           @blur="handleBlur"
           @focus="handleFocus"/>
    <div v-style="styles.bottomBorder"></div>
  </div>
</template>
<script type="text/babel">
  import color from 'color'
  import themeManager from '../../styles/theme-manager'

  let rawTheme = themeManager.getRawTheme()
  let {primaryColor} = rawTheme
  export default{
    props: {},
    data () {
      return {
        transform: 'scaleX(0)',
        opacity: 1,
        //当前输入框是否处于中文输入法状态下
        isChinese: false,
        input: ''

      }
    },
    computed: {
      styles () {
        return {
          root: {
            position: 'relative',
            display: 'inline-block',
            width: 256,
            paddingBottom: 8,
            lineHeight: '24px',
            fontFamily: 'Roboto, sans-serif'
          },
          hintText: {
            position: 'relative',
            bottom: -24,
            opacity: this.opacity,
            color: color('black').alpha(0.3).rgbString(),
            transition: 'all 450ms ease-out 0ms',
            zIndex: -1
          },
          input: {
            border: 'none',
            borderBottom: '1px solid #ddd',
            outline: 'none',
            padding: 0,
            paddingBottom: 8,
            fontSize: 16,
            width: '100%',
            background: 'transparent'
          },
          bottomBorder: {
            position: 'absolute',
            bottom: 8,
            width: '100%',
            height: 2,
            transform: this.transform,
            backgroundColor: primaryColor,
            transition: 'transform 450ms ease-out 0ms'
          }
        }
      }
    },
    watch: {
      'input' () {
        //input内容发生改变时,当前可能不是中文输入法,也可能刚刚终结了一次中文输入
        this.isChinese = false
      },
      'input || isChinese' (value) {
        if (value) {
          this.opacity = 0
        } else {
          this.opacity = 1
        }
      }
    },
    methods: {
      handleFocus () {
        this.transform = 'scaleX(1)'
      },
      handleBlur () {
        this.transform = 'scaleX(0)'
      },
      handleKeyDown (event) {
        let keyCode = event.keyCode || event.which
        if (keyCode === 229) {
          this.isChinese = true
        }
      }
    },
    components: {},
    ready () {
      window.b = this
    }
  }
</script>
