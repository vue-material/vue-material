<template>
  <div v-style="styles.root" @click="handleClick">
    <div v-style="styles.container">
      <input type="radio"
             v-el:input
             v-style="styles.input"
             :name="name"
             :value="value"
             @click="handleInputClick"
             v-model="$parent.valueSelected"
      />
      <span v-show="$parent.labelPosition==='left'" v-style="styles.leftSpan">{{label}}</span>
      <div v-style="styles.circle">
        <div v-style="styles.internalCircle">
          <div v-style="style" v-for="style in rippleList"></div>
        </div>
      </div>
      <span v-show="$parent.labelPosition==='right'" v-style="styles.rightSpan">{{label}}</span>
    </div>
  </div>
</template>
<script type="text/babel">
  import themeManager from '../../styles/theme-manager'
  import color from 'color'
  import fn from '../../util/fn'
  import { defaultProps, any, oneOf, oneOfType } from '../../util/prop'
  import styleUtil from '../../styles/util'

  let muiTheme = themeManager.getTheme()
  let {primaryColor, disabledColor} = muiTheme
  let {nextAnimationFrame} = fn
  export default{
    props: defaultProps({
      disabled: false,
      label: String,
      /**
       * 支持任何类型的值
       */
      value: any,

      /**
       * 覆盖根元素的样式
       */
      style: Object
    }),
    data () {
      return {
        transform: '',
        rippleList: []
      }
    },
    watch: {},
    computed: {
      styles () {
        let circleSize = 16
        let color
        let {checked, disabled} = this
        if (disabled) {
          color = disabledColor
        } else if (checked) {
          color = primaryColor
        } else {
          color = 'black'
        }
        let internalCircle = {
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block'
        }
        let span = {
          alignSelf: 'center'
        }
        return {
          root: styleUtil.mergeStyle({}, this.style),
          container: {
            display: 'inline-flex',
            marginLeft: 5,
            marginRight: 16,
            position: 'relative'
          },
          input: {
            //input 设置绝对定位,left,top,right,bottom设为0,宽高却没有占满父容器,设置width,height为100%可以
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0
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
            transform: checked ? 'scale(0.6)' : 'scale(0)',
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
          rightSpan: {
            marginLeft: 16,
            ...span
          },
          leftSpan: {
            marginRight: 16,
            ...span
          }
        }
      },
      checked () {
        return this.$parent.valueSelected === this.value
      }
    },
    methods: {
      handleClick () {
        let duration = 500
        let {rippleList, styles} = this
        rippleList.push({
          ...styles.ripple,
          transform: 'scale(0)',
          transition: `all ${duration}ms linear`,
          opacity: 0.5
        })
        let style = rippleList[rippleList.length - 1]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            style.transform = 'scale(4)'
            style.opacity = 0
            setTimeout(() => {
              rippleList.$remove(style)
            }, duration)
          })
        })
        this.onClick && this.onClick(this.value)
      },
      handleInputClick () {
        this.$parent.handleChange(this.value, this.$parent.valueSelected)
      }
    },
    components: {},
    compiled () {

    },
    ready () {

    }
  }
</script>
