<template>
  <m-button
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="styles.button"
    :from-center="true">
    <slot></slot>
    <m-popover
      v-if="hasTooltip"
      :animated="false"
      :use-layer-for-click-away="false"
      :anchor-el="anchor"
      :anchor-origin="anchorOrigin"
      :target-origin="targetOrigin"
      :visible.sync="visible">
      <div v-style="styles.tooltip" v-el:tooltip>
        <div v-style="styles.clip"></div>
        <slot name="tooltip"></slot>
      </div>
    </m-popover>
  </m-button>
</template>
<script type="text/babel">
  import mButton from './Button.vue'
  import mPopover from '../Popover.vue'
  import { defaultProps, any, oneOf } from '../../util/prop'
  import styleUtil from '../../styles/util'
  import fn from '../../util/fn'

  let {nextAnimationFrame} = fn
  let positionMap = {
    'top-left': {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      targetOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      clip: {
        left: '100%',
        top: '100%',
        transform: 'translate3d(-50%,-50%,0)'
      }
    },
    'top-center': {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'middle'
      },
      targetOrigin: {
        vertical: 'bottom',
        horizontal: 'middle'
      },
      clip: {
        top: '100%',
        left: '50%',
        transform: 'translate3d(-50%,-50%,0)'
      }
    },
    'top-right': {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      targetOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      clip: {
        left: '0%',
        bottom: '0%',
        transform: 'translate3d(-50%,50%,0)'
      }
    },
    'bottom-left': {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      clip: {
        top: '0%',
        right: '0%',
        transform: 'translate3d(50%,-50%,0)'
      }
    },
    'bottom-center': {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'middle'
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'middle'
      },
      clip: {
        bottom: '100%',
        left: '50%',
        transform: 'translate3d(-50%,50%,0)'
      }
    },
    'bottom-right': {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      clip: {
        right: '100%',
        bottom: '100%',
        transform: 'translate3d(50%,50%,0)'
      }
    }
  }
  export default{
    props: defaultProps({
      disabled: false,
      tooltip: '',
      tooltipPosition: oneOf(
        [
          'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
        ],
        'bottom-center'
      ),
      tooltipStyle: {},
      //覆盖根元素的样式
      style: {},
      //覆盖icon的样式
      iconStyle: {}
    }),
    data () {
      return {
        visible: false,
        anchor: null,
        clipWidth: 0,
        clipHeight: 0,
        transform: 'translateY(0px)',
        positionMap
      }
    },
    watch: {
      'iconStyle' () {
        this.setIconStyle()
      }
    },
    computed: {
      styles () {
        let size = 48
        return {
          button: styleUtil.mergeStyle({
            borderRadius: '50%',
            width: size,
            height: size,
            display: 'inline-flex',
            justifyContent: 'center',
            alignContent: 'center',
            transform: 'translate3d(0,0,0)', //设置了translate3d后,圆角部分也会hidden,否则不会
            overflow: 'hidden'
          }, this.style),
          tooltip: {
            color: 'white',
            padding: 10,
            borderRadius: 2,
            fontSize: 12,
            overflow: 'hidden',
            position: 'relative',
            transform: this.transform,
            transition: 'transform 450ms ease-out 0ms'
          },
          clip: {
            ...positionMap[this.tooltipPosition].clip,
            position: 'absolute',
            borderRadius: '50%',
            width: this.clipWidth,
            height: this.clipHeight,
            backgroundColor: 'rgb(97, 97, 97)',
            opacity: 0.9,
            zIndex: -1,
            transition: 'width 450ms ease-out 0ms,height 450ms ease-out 0ms'
          }
        }
      },
      anchorOrigin () {
        return positionMap[this.tooltipPosition].anchorOrigin
      },
      targetOrigin () {
        return positionMap[this.tooltipPosition].targetOrigin
      },
      hasTooltip () {
        return !!this._slotContents.tooltip
      },
      props () {
        let {styles} = this
        return {
          style: styles.button
        }
      }
    },
    methods: {
      setIconStyle () {
        let icon = this.$children[1]
        if (icon) {
          icon.style = this.iconStyle
        }
      },
      handleMouseEnter (event) {
        this.visible = true
        this.anchor = event.target.children[0]
        this.$nextTick(() => {
          nextAnimationFrame(() => {
            let rect = this.$els.tooltip.getClientRects()[0]
            let {width, height} = rect
            let size = (width + height) * 2
            console.log(width, height)
            this.clipWidth = size
            this.clipHeight = size
            let direction = this.tooltipPosition.startsWith('top') ? '-' : ''
            this.transform = `translateY(${direction}20px)`
          })
        })
      },
      handleMouseLeave () {
        this.visible = false
        this.clipWidth = 0
        this.clipHeight = 0
        this.transform = 'translateY(0px)'
      }
    },
    components: {
      mButton,
      mPopover
    },
    compiled () {
    },
    ready () {
      this.setIconStyle()
    }
  }
</script>
