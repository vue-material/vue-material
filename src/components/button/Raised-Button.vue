<template>
  <button></button>
</template>
<script type="text/babel">
  export default{
    props: {
      backgroundColor: String,
      disabled: {
        type: Boolean,
        default: false
      },
      label: String,
      onMouseDown: {
        type: Function,
        default: () => {}
      },
      onMouseUp: {
        type: Function,
        default: () => {}
      },
      onMouseEnter: {
        type: Function,
        default: () => {}
      },
      onMouseLeave: {
        type: Function,
        default: () => {}
      },
      primary: {
        type: Boolean,
        default: false
      },
      secondary: {
        type: Boolean,
        default: false
      },
      style: Object
    },
    data () {
      return {}
    },
    components: {}
  }
</script>
