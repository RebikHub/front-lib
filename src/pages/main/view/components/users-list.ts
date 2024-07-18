import { createComponent } from '@lib/index'

export const UsersList = (users: Array<{ name: string }> | null): DocumentFragment => {
  const fragment = document.createDocumentFragment()
  const li = createComponent({ tag: 'li', content: '' })
  if (users != null) {
    users.forEach(({ name }) => {
      const clone = li.cloneNode(true)
      clone.textContent = name
      fragment.appendChild(clone)
    })
  }
  return fragment
}
