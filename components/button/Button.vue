<style scoped>

</style>

<template>
  <button :type="type" @click="onClick" :class="classes.button">
    <span :class="classes.span">
      <div :class="classes.div" :style="wave" v-for="wave in waveList">

      </div>
    </span>
    <div :class="classes.background">

    </div>
    <slot></slot>
  </button>
</template>

<script type="text/babel">
  import  jss from 'jss'
  let sheet = jss.createStyleSheet({
    button: {
      width: '100px',
      height: '30px',
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
      width:'100%',
      height:'100%',
      'z-index': -2,
    },
    div: {
      'border-radius': '50px',
      background: 'red',
      position: 'absolute',
      'z-index': -1,
      background:'-webkit-gradient(linear, 0% 0%, 0% 100%,from(#cccccc), to(#dfdfdf))'
    },
    span: {
      width: '100%',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',

      //      left:0,
      //      top:0
    }
  }).attach()
  export default {
    props: {
      type: String,
      size: String,
    },
    data(){
      return {
        classes: sheet.classes,

        waveList: [],
        onClick: (event) => {
          let {waveList}=this
          console.log(event.target)
          waveList.push({
            left: event.offsetX + 'px',
            top: event.offsetY + 'px',
            width: '2px',
            height: '2px',
          })
          let style = waveList[waveList.length - 1]

          function loop() {
            requestAnimationFrame(()=> {
              style.width = parseInt(style.width) + 8 + 'px'
              style.height = parseInt(style.height) + 8 + 'px'
              style.left = parseInt(style.left) - 4 + 'px'
              style.top = parseInt(style.top) - 4 + 'px'
              if (parseInt(style.width) <= 200) {
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
