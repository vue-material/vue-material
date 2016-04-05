<style scoped>

</style>

<template>
  <button :type="type" @click="onClick" :class="classes.button">
    <span :class="classes.span">
      <div :class="classes.div" :style="addUnit(wave)" v-for="wave in waveList">

      </div>
    </span>
    <div :class="classes.background">

    </div>
    <slot></slot>
  </button>
</template>

<script type="text/babel">
  import jss from '../../utils/jss'
  let sheet = jss.createStyleSheet({
    button: {
      width: 100,
      height: 30,
      border: 'none',
      outline: 'none',
      position: 'relative',
      background: 'transparent'
    },
    background: {
      background: '#dfdfdf',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: -2
    },
    div: {
      borderRadius: 50,
      position: 'absolute',
      zIndex: -1,
      background: 'radial-gradient(red,#dfdfdf)'
    },
    span: {
      width: '100%',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden'

      //      left:0,
      //      top:0
    },
    test: {
      width: 10
    }
  }).attach()
  export default {
    props: {
      type: String,
      size: String

    },
    methods: {
      addUnit (style) {
        let result = {}
        for (var key in style) {
          if (typeof style[key] === 'number') {
            result[key] = style[key] + 'px'
          } else {
            result[key] = style[key]
          }
        }
        return result
      }
    },
    data () {
      return {
        classes: sheet.classes,

        waveList: [],
        onClick: event => {
          let {waveList} = this
          waveList.push({
            left: event.offsetX,
            top: event.offsetY,
            width: 2,
            height: 2
          })
          let style = waveList[waveList.length - 1]

          function loop () {
            window.requestAnimationFrame(() => {
              let {width, height, left, top} = style
              style.width = width + 8
              style.height = height + 8
              style.left = left - 4
              style.top = top - 4
              if (style.width <= 200) {
                loop()
              } else {
                waveList.shift()
              }
            })
          }

          loop()
        }
      }
    },
    computed: {}
  }
</script>
