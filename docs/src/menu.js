export default [
  {
    name: 'Components',
    children: [
      {
        name: 'Buttons',
        children: [
          {
            name: 'Flat Button',
            path: '/page/flat-button'
          },
          {
            name: 'Raised Button',
            path: '/page/raised-button'
          },
          {
            name: 'Floating Action Button',
            path: '/page/floating-action-button'
          },
          {
            name: 'Icon Button',
            path: '/page/icon-button'
          }
        ]
      },
      {
        name: 'Popover',
        path: '/page/popover'
      },
      {
        name: 'Icons',
        children: [
          {
            name: 'SVG Icon',
            path: '/page/svg-icon'
          }
        ]
      },
      {
        name: 'Switches',
        children: [
          {
            name: 'Toggle',
            path: '/page/toggle'
          },
          {
            name: 'Radio Button',
            path: '/page/radio'
          }
        ]
      }
    ]
  }
]
