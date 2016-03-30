<template>
  <button :type="type" @click="onClick">
    <slot></slot>
  </button>
</template>

<script type="text/babel">

  export default {
    props: {
      type: String,
      size: String,
      onClick: () => {
      },
    },
    computed: {}
  }
</script>
