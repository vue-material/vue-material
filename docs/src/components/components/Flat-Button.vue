<template>
  <m-button label="Default"></m-button>
  <m-button :primary="true" label="Primary"></m-button>
  <m-button :secondary="true" label="Secondary"></m-button>
  <m-button :disabled="true" label="Disabled"></m-button>

  <m-button label="Default"><span slot="before">Before</span></m-button>
  <m-button label="Default"><span>After</span></m-button>
  <m-button label="Default"><span slot="after">After</span></m-button>
</template>

<script>
  import mButton from 'vuejs-material/components/button/Flat-Button.vue'
  export default{
    data () {
      return {}
    },
    components: {
      mButton
    }
  }
</script>
