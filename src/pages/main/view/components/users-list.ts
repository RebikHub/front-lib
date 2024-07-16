import { createComponent } from '@lib/index'

export const UsersList = (users: Array<{ name: string }> | null): DocumentFragment => {
  const fragment = document.createDocumentFragment()
  if (users != null) {
    users.forEach(({ name }) => {
      const li = createComponent({ tag: 'li', content: name })
      fragment.appendChild(li)
    })
  }
  return fragment
}
