<template>
  labelPosition
  <input
    id="label-left"
    type="radio"
    name="labelPosition"
    v-model="labelPosition"
    value="left"/>
  <label for="label-left">left</label>
  <input
    id="label-right"
    type="radio"
    name="labelPosition"
    v-model="labelPosition"
    value="right"/>
  <label for="label-right">right</label>
  <p>当前配置:{{labelPosition}}</p>

  <m-radio-group :value-selected="valueSelected"
                 :on-change="onChange"
                 name="demo"
                 :label-position="labelPosition">
    <m-radio v-for="radio in radioList"
             :label="radio.text"
             :value="radio.value"
             :style="radioStyle">
    </m-radio>
  </m-radio-group>
</template>
<script type="text/babel">
  import { Radio as mRadio, RadioGroup as mRadioGroup } from 'vuejs-material/components/Radio'
  export default{
    data () {
      return {
        labelPosition: 'right',
        valueSelected: 'tao',
        radioList: [
          {
            text: '苹果',
            value: 'apple'
          },
          {
            text: '桃子',
            value: 'tao'
          }
        ],
        radioStyle: {
          display: 'block',
          marginBottom: 16
        }
      }
    },
    methods: {
      onChange (value, oldValue) {
        console.log(value, oldValue)
      }
    },
    components: {
      mRadio,
      mRadioGroup
    }
  }
</script>
