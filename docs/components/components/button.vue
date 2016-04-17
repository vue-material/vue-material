<template>
  <m-button label="Default"></m-button>
  <m-button :primary="true" label="Primary"></m-button>
  <m-button :secondary="true" label="Secondary"></m-button>
  <m-button :disabled="true" label="Disabled"></m-button>
  <m-button :secondary="true"
            ripple-color="rgba(255,0,0,.8)"
            background-color="red"
            hover-color="rgba(0,255,0,.3)"
            label="Secondary1">
  </m-button>
</template>

<script>
  import mButton from '../../../src/components/button/Button.vue'
  export default{
    data () {
      return {}
    },
    components: {
      mButton
    }
  }
</script>
