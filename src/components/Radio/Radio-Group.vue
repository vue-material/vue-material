<template>
  <div>
    <slot></slot>
  </div>
</template>
<script type="text/babel">
  import { defaultProps, any, oneOf } from '../../util/prop'
  import { isFunction } from '../../util/type'

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
      valueSelected: any,
      /**
       * label在单选按钮左侧还是右侧
       */
      labelPosition: oneOf(['left', 'right'], 'right'),
      /**
       * 应用在所有的单选上
       */
      name: {
        required: true,
        type: String
      }
    }),
    data () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      /**
       * 设置子组件的属性
       * @param {String} prop
       * @param {*} value
       */
      setChildren (prop, value) {
        this.$children.forEach(item => {
          item[prop] = isFunction(value) ? value(item) : value
        })
      },
      handleChange (value, oldValue) {
        this.onChange && this.onChange(value, oldValue)
      }
    },
    components: {},
    compiled () {
    },
    ready () {
    }
  }
</script>
