
 <template>
   <svg is="m-svg-icon" :color="color"
        :hover-color="hoverColor"
        :view-box.camel="viewBox"
        :on-click="onClick"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="styles.icon">
     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
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
