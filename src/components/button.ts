import { createComponent } from '../../lib/component'

interface Props {
  title: string
  onClick: (event?: Event) => void
}

export function Button ({ title, onClick }: Props): HTMLElement {
  return createComponent({
    elementName: 'button',
    textContent: title,
    events: {
      click: onClick
    }
  })
}
