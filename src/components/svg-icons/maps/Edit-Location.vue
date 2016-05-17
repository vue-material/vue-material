
 <template>
   <svg is="m-svg-icon" :color="color"
        :hover-color="hoverColor"
        :view-box.camel="viewBox"
        :on-click="onClick"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="styles.icon">
     <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.56 10H9v-1.44l3.35-3.34 1.43 1.43L10.44 12zm4.45-4.45l-.7.7-1.44-1.44.7-.7c.15-.15.39-.15.54 0l.9.9c.15.15.15.39 0 .54z"/>
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
