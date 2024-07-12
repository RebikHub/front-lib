import { createComponent } from '../../../lib/component'

interface Props {
  title: string
  onClick: (event?: Event) => void
  disabled?: boolean
}

export function Button ({ title, onClick, disabled }: Props): HTMLElement {
  return createComponent({
    tag: 'button',
    content: title,
    events: {
      click: onClick
    },
    disabled
  })
}
