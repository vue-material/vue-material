
 <template>
   <svg is="m-svg-icon" :color="color"
        :hover-color="hoverColor"
        :view-box.camel="viewBox"
        :on-click="onClick"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="styles.icon">
     <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
   </svg>
 </template>
 <script type="text/babel">
   import mSvgIcon from '../../SvgIcon/SvgIcon.vue'
   import color from 'color'
   import themeManager from '../../../styles/theme-manager'
   import styleUtil from '../../../styles/util'

   export default {
     props: {
       color: String,
       hoverColor: {
         type: String,
         default: '#000'
       },
       viewBox: {
         type: String,
         default: '0 0 24 24'
       },
       onClick: {
         type: Function,
         default: () => {}
       },
       onMouseEnter: {
         type: Function,
         default: () => {}
       },
       onMouseLeave: {
         type: Function,
         default: () => {}
       },
       style: [Object, Array]
     },
     computed: {
       styles () {
         let hoverColor = this.hoverColor || '#000'
         let color = this.color || '#000'
         let icon = styleUtil.mergeStyle({
           fill: color,
           ':hover': {
             fill: hoverColor
           }
         }, this.style)
         return {
           icon
         }
       }
     },
     components: {
       mSvgIcon
     },
     ready () {

     }
   }
 </script>
