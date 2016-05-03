<template>
  <div :class="classes.main">
    <m-button label="Default"></m-button>
    <m-button label="Primary" :primary="true"></m-button>
    <m-button :secondary="true" label="Secondary"></m-button>
    <m-button :disabled="true" label="Disabled"></m-button>

    <m-button label="Default"><span slot="before">Before</span></m-button>
    <m-button label="Default"><span>After</span></m-button>
    <m-button label="Default"><span slot="after">After</span></m-button>
  </div>
</template>

<script>
  import mButton from '../../../src/components/button/Raised-Button.vue'
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
