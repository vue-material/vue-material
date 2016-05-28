<template>
  <span></span>
</template>
<script type="text/babel">
  import event from '../util/event'
  import dom from '../util/dom'
  import debug from '../util/debug'
  import fn from '../util/fn'
  import { defaultProps, any, oneOf, oneOfType } from '../util/prop'

  let {warn} = debug
  let {nextAnimationFrame} = fn
  const template = `
    <div v-show="canShow()" v-style="styles.maskLayer">

    </div>
    <div  v-style="styles.popover" v-el:popover>
      <slot></slot>
    </div>
  `
  const duration = 200
  export default {
    props: defaultProps({
      anchorEl: window.Element,
      visible: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      animated: true,
      /**
       * 可选值 'from-top','from-origin'
       */
      animation: oneOf(['from-top', 'from-origin']),

      autoCloseWhenOffScreen: true,
      canAutoPosition: true,
      onRequestClose: () => {},
      open: false,
      style: oneOfType([Object, Array]),
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      useLayerForClickAway: true
    }),
    data () {
      return {
        position: {
          left: 0,
          top: 0
        },
        transform: this.getTransformPair()[0],
        transition: 'initial'
      }
    },
    computed: {
      transformPair () {
        return this.getTransformPair()
      },
      styles () {
        let {targetOrigin} = this
        return {
          popover: {
            ...this.position,
            position: 'absolute',
            zIndex: 1001,
            transform: this.transform,
            transition: this.transition,
            transformOrigin: `${targetOrigin.horizontal} ${targetOrigin.vertical}`.replace('middle', 'center')
          },
          maskLayer: {
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000
          }
        }
      }
    },
    watch: {
      visible (newValue) {
        if (newValue) {
          this.position = this.getPosition()
          this.transition = 'initial'
          if (this.animated) {
            this.transform = this.transformPair[0]
            this.removeListener && this.removeListener()
            if (this.useLayerForClickAway) {
//              setTimeout(() => {
              this.removeListener = event.addListenerForClickAway(this.$els.popover, () => {
                this.visible = false
              }, true)
//              }, 0)
            }
            this.$nextTick(() => {
              nextAnimationFrame(() => {
                this.transform = this.transformPair[1]
                this.transition = `all ${duration}ms linear`
              })
            })
          } else {
            this.transform = this.transformPair[1]
          }
        } else {
          this.transform = this.transformPair[0]
        }
      }
    },
    methods: {
      getTransformPair () {
        let animation = this.animation || 'from-origin'
        let animationTransformMap = {
          'from-origin': ['scale(0)', 'scale(1)'],
          'from-top': ['scaleY(0)', 'scaleY(1)']
        }
        return animationTransformMap[animation]
      },
      canShow () {
        if (this.visible && !this.anchorEl) {
          warn('当前anchorEl为', this.anchorEl, '无法显示Popover,请设置anchorEl属性')
        }
        return this.useLayerForClickAway && this.visible && this.anchorEl
      },
      getPosition () {
        let position = {
          left: 0,
          top: 0
        }
        if (this.anchorEl) {
          let anchorComputedStyle = window.getComputedStyle(this.anchorEl)
          let [anchorWidth, anchorHeight] = [anchorComputedStyle.width, anchorComputedStyle.height].map(num => parseInt(num))
          let popoverComputedStyle = window.getComputedStyle(this.$els.popover)
          let [popoverWidth, popoverHeight] = [popoverComputedStyle.width, popoverComputedStyle.height].map(num => parseInt(num))
          let anchorPosition = dom.getNodeDocumentOffset(this.anchorEl)
          let {vertical: anchorVertical, horizontal: anchorHorizontal} = this.anchorOrigin
          let {vertical: popoverVertical, horizontal: popoverHorizontal} = this.targetOrigin
          let anchorPositionOffsetMap = {
            left: 0,
            middle: anchorWidth / 2,
            right: anchorWidth,
            top: 0,
            center: anchorHeight / 2,
            bottom: anchorHeight
          }
          let popoverPositionOffsetMap = {
            left: 0,
            middle: -popoverWidth / 2,
            right: -popoverWidth,
            top: 0,
            center: -popoverHeight / 2,
            bottom: -popoverHeight
          }
          position = {
            left: anchorPosition.left + anchorPositionOffsetMap[anchorHorizontal] + popoverPositionOffsetMap[popoverHorizontal],
            top: anchorPosition.top + anchorPositionOffsetMap[anchorVertical] + popoverPositionOffsetMap[popoverVertical]
          }
        }
        return position
      }
    },
    components: {},
    compiled () {
      const div = document.createElement('div')
      div.innerHTML = template
      this.$compile(div)
      document.body.appendChild(div)
    },
    ready () {
    },
    destroyed () {
      this.removeListener && this.removeListener()
    }
  }
</script>
