<template>
  <div>
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
  import mButton from 'vuejs-material/components/button/Raised-Button.vue'
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
