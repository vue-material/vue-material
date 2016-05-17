
 <template>
   <svg is="m-svg-icon" :color="color"
        :hover-color="hoverColor"
        :view-box.camel="viewBox"
        :on-click="onClick"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="styles.icon">
     <path d="M23 15h-2v2h2v-2zm0-4h-2v2h2v-2zm0 8h-2v2c1 0 2-1 2-2zM15 3h-2v2h2V3zm8 4h-2v2h2V7zm-2-4v2h2c0-1-1-2-2-2zM3 21h8v-6H1v4c0 1.1.9 2 2 2zM3 7H1v2h2V7zm12 12h-2v2h2v-2zm4-16h-2v2h2V3zm0 16h-2v2h2v-2zM3 3C2 3 1 4 1 5h2V3zm0 8H1v2h2v-2zm8-8H9v2h2V3zM7 3H5v2h2V3z"/>
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
