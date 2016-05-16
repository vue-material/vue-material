<template>
  <m-button label="+"></m-button>
  <m-button label="+" :mini="true"></m-button>
  <m-button :primary="true" label="+"></m-button>
  <m-button :primary="true" :mini="true" label="+"></m-button>
  <m-button :secondary="true" label="+"></m-button>
  <m-button :secondary="true" :mini="true" label="+"></m-button>
  <m-button :disabled="true" label="+"></m-button>
  <m-button :disabled="true" :mini="true" label="+"></m-button>
</template>
<script type="text/babel">
  import mButton from 'vuejs-material/components/button/Floating-Action-Button'
  import jss from 'vuejs-material/util/jss'
  export default{
    data () {
      return {}
    },
    components: {
      mButton
    }
  }
</script>
