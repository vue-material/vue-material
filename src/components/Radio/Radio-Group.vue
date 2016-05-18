<template>
  <div>
    <slot></slot>
  </div>
</template>
<script type="text/babel">
  import { defaultProps, any } from '../../util/prop'
  export default {
    /**
     *
     */
    props: defaultProps({
      /**
       * 值发生变化后的回调
       */
      onChange: () => {},
      /**
       * 覆盖组件根元素的样式
       */
      style: () => {},
      /**
       * 选中的值
       */
      valueSelected: any
    }),
    data () {
      return {}
    },
    computed: {},
    methods: {},
    components: {},
    ready () {

    }
  }
</script>
