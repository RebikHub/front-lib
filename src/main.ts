import { createComponent, initApp } from '../lib/components/component'

initApp('root', [
  createComponent({
    content: 'Hello world!',
    events: {
      click: () => alert('Hi!!')
    }
  })
])
