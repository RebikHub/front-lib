import { createComponent } from '../../lib/component'

interface Props {
  title: string
  onClick: () => void
}

export function Button ({ title, onClick }: Props) {
  return createComponent({
    elementName: 'button',
    textContent: title,
    onClick
  })
}
