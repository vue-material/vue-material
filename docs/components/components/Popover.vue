<template>
  <div>
    <m-button
      :on-click="handleClick1"
      label="CLICK ME">
    </m-button>
    <m-popover
      :anchor-el="anchor1"
      :visible.sync="visible1">
      <div>
        <m-button :primary="true" label="按钮"></m-button>
      </div>
    </m-popover>
    <m-button
      :on-click="handleClick2"
      label="CLICK ME">
    </m-button>
    <m-popover
      :anchor-el="anchor2"
      animation="from-top"
      :visible.sync="visible2">
      <div>
        <m-button :primary="true" label="按钮"></m-button>
      </div>
    </m-popover>
  </div>
</template>
<script type="text/babel">
  import mButton from '../../../src/components/button/Raised-Button'
  import mPopover from '../../../src/components/Popover'

  export default{
    data () {
      return {
        visible1: false,
        anchor1: null,
        visible2: false,
        anchor2: null
      }
    },
    methods: {
      handleClick1 (event) {
        this.anchor1 = event.target
        this.visible1 = true
      },
      handleClick2 (event) {
        this.anchor2 = event.target
        this.visible2 = true
      }
    },
    components: {
      mPopover,
      mButton
    },
    ready () {
    }
  }
</script>
