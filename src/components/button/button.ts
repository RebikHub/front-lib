import { createComponent } from 'crs-arch'

interface Props {
  title: string
  onClick: (event?: Event) => void
}

export function Button ({ title, onClick }: Props): HTMLElement {
  return createComponent({
    tag: 'button',
    content: title,
    events: {
      click: onClick
    }
  })
}
