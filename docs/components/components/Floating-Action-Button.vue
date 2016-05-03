<template>
  <div :class="classes.main">
    <m-button label="+"></m-button>
    <m-button label="+" :mini="true"></m-button>
    <m-button :primary="true" label="+"></m-button>
    <m-button :primary="true" :mini="true" label="+"></m-button>
    <m-button :secondary="true" label="+"></m-button>
    <m-button :secondary="true" :mini="true" label="+"></m-button>
    <m-button :disabled="true" label="+"></m-button>
    <m-button :disabled="true" :mini="true" label="+"></m-button>
  </div>
</template>
<script type="text/babel">
  import mButton from '../../../src/components/button/Floating-Action-Button'
  import jss from '../../../src/util/jss'
  let sheet = jss.createStyleSheet({
    main: {
      padding: 15
    }
  }).attach()
  export default{
    data () {
      return {
        classes: sheet.classes
      }
    },
    components: {
      mButton
    }
  }
</script>
