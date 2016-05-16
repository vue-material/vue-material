
 <template>
   <svg is="m-svg-icon" :color="color"
        :hover-color="hoverColor"
        :view-box.camel="viewBox"
        :on-click="onClick"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="styles.icon">
     <path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"/>
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
