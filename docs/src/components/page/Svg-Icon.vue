<template>
  <m-action-home-icon color="red" hover-color="blue" :style="iconStyle"></m-action-home-icon>
  <m-action-accessible-icon ></m-action-accessible-icon>
</template>
<script type="text/babel">
  import mActionHomeIcon from 'vuejs-material/components/svg-icons/action/Home.vue'
  import mActionAccessibleIcon from 'vuejs-material/components/svg-icons/action/Accessible.vue'

  export default{
    data () {
      let iconStyle = {
        width: 36,
        height: 36
      }
      return {iconStyle}
    },
    components: {
      mActionHomeIcon,
      mActionAccessibleIcon
    }
  }
</script>
