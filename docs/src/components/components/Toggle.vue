<template>
  <m-toggle></m-toggle>
  <m-toggle :toggled.sync="toggled"></m-toggle>
</template>
<script type="text/babel">
  import mToggle from 'vuejs-material/components/Toggle.vue'
  export default{
    data () {
      return {
        toggled: true
      }
    },
    components: {
      mToggle
    }
  }
</script>
