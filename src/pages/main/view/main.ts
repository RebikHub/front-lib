
import { createComponent } from '@lib/index'
import { add, getUsers, StateMain } from '../modules'
import { UsersList } from './components/users-list'

export function Main (): HTMLElement {
  const element = createComponent({ content: 'list users' })

  add('Main', (state: StateMain) => {
    element.textContent = state.loading
      ? 'Loading...'
      : state.error != null
        ? state.error
        : 'Users list'

    if (!state.loading && (state.users != null)) {
      const usersList = UsersList(state.users)
      element.innerHTML = ''
      element.appendChild(usersList)
    }
  })

  return createComponent({
    content: 'Home page',
    children: [
      element,
      createComponent({
        tag: 'button',
        content: 'Get users',
        events: {
          click: () => {
            getUsers().catch((error) => {
              console.error(error)
            })
          }
        }
      })
    ]
  })
}
