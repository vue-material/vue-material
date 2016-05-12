<template>
  <div>
    <section>
      anchorOrigin
      <p>
        Vertical
      </p>
      <input name="anchorVertical" type="radio" value="top" v-model="anchorVertical">Top
      <input name="anchorVertical" type="radio" value="center" v-model="anchorVertical">Center
      <input name="anchorVertical" type="radio" value="bottom" v-model="anchorVertical">Bottom
      <p>
        Horizontal
      </p>
      <input name="anchorHorizontal" type="radio" value="left" v-model="anchorHorizontal">Left
      <input name="anchorHorizontal" type="radio" value="middle" v-model="anchorHorizontal">Middle
      <input name="anchorHorizontal" type="radio" value="right" v-model="anchorHorizontal">Right
    </section>
    <section>
      targetOrigin
      <p>
        Vertical
      </p>
      <input name="targetVertical" type="radio" value="top" v-model="targetVertical">Top
      <input name="targetVertical" type="radio" value="center" v-model="targetVertical">Center
      <input name="targetVertical" type="radio" value="bottom" v-model="targetVertical">Bottom
      <p>
        Horizontal
      </p>
      <input name="targetHorizontal" type="radio" value="left" v-model="targetHorizontal">Left
      <input name="targetHorizontal" type="radio" value="middle" v-model="targetHorizontal">Middle
      <input name="targetHorizontal" type="radio" value="right" v-model="targetHorizontal">Right
    </section>
    <section>
      animation
      <input name="animation" type="radio" value="from-top" v-model="animation">from-top
      <input name="animation" type="radio" value="from-origin" v-model="animation">from-origin
    </section>
    <div>
      当前设置
      <p>
        anchorOrigin:{{anchorOrigin | json }}
        targetOrigin:{{targetOrigin | json }}
        animation:{{animation}}
      </p>
    </div>
    <m-button
      :on-click="handleClick"
      label="CLICK ME">
    </m-button>
    <m-popover
      :animation="animation"
      :anchor-el="anchor"
      :anchor-origin="anchorOrigin"
      :target-origin="targetOrigin"
      :visible.sync="visible">
      <div>
        <m-button :primary="true" label="按钮"></m-button>
      </div>
    </m-popover>
    <pre v-el:code><code>{{source}}</code></pre>
  </div>
</template>
<script type="text/babel">
  import mButton from '../../../src/components/button/Raised-Button'
  import mPopover from '../../../src/components/Popover'

  export default{
    data () {
      return {
        anchorVertical: 'top',
        anchorHorizontal: 'left',
        targetVertical: 'top',
        targetHorizontal: 'left',
        animation: 'from-top',
        anchor: null,
        visible: false,
        source: require('!raw!./Popover.vue')
      }
    },
    computed: {
      anchorOrigin () {
        return {
          vertical: this.anchorVertical,
          horizontal: this.anchorHorizontal
        }
      },
      targetOrigin () {
        return {
          vertical: this.targetVertical,
          horizontal: this.targetHorizontal
        }
      }
    },
    methods: {
      handleClick (event) {
        this.anchor = event.target
        this.visible = true
      }
    },
    components: {
      mPopover,
      mButton
    },
    ready () {
      window.hljs.highlightBlock(this.$els.code)
    }
  }
</script>
