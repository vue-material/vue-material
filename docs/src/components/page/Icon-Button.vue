<template>
  <div>
    <m-button :icon-style="smallIcon" :style="small">
      <m-action-home-icon></m-action-home-icon>
    </m-button>
    <m-button :icon-style="mediumIcon" :style="medium">
      <m-action-home-icon></m-action-home-icon>
    </m-button>
    <m-button :icon-style="largeIcon" :style="large">
      <m-action-home-icon></m-action-home-icon>
    </m-button>
  </div>
  <div>
    <m-button :icon-style="smallIcon" :style="small">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-right
      </div>
    </m-button>
    <m-button :icon-style="mediumIcon" :style="medium">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-right
      </div>
    </m-button>
    <m-button :icon-style="largeIcon" :style="large">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-right
      </div>
    </m-button>
  </div>
  <div>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="bottom-left">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-left
      </div>
    </m-button>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="bottom-center">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-center
      </div>
    </m-button>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="bottom-right">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        bottom-right
      </div>
    </m-button>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="top-right">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        top-right
      </div>
    </m-button>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="top-center">
      <m-action-home-icon></m-action-home-icon>
      <div slot="tooltip">
        top-center
      </div>
    </m-button>
    <m-button :icon-style="smallIcon"
              :style="small"
              tooltip-position="top-left">
      <m-action-home-icon color="red"></m-action-home-icon>
      <div slot="tooltip">
        top-left
      </div>
    </m-button>
  </div>
</template>
<script type="text/babel">
  import mButton from 'vuejs-material/components/button/Icon-Button.vue'
  import mActionHomeIcon from 'vuejs-material/components/svg-icons/action/Home.vue'

  export default{
    props: {},
    data () {
      return {
        smallIcon: {
          width: 36,
          height: 36
        },
        small: {
          width: 60,
          height: 60
        },
        mediumIcon: {
          width: 48,
          height: 48
        },
        medium: {
          width: 72,
          height: 72
        },
        largeIcon: {
          width: 60,
          height: 60
        },
        large: {
          width: 96,
          height: 96
        }
      }
    },
    computed: {},
    methods: {},
    components: {
      mButton,
      mActionHomeIcon
    },
    ready () {
    }
  }
</script>
