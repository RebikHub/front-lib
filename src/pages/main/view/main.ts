
import { createComponent, observe } from '@lib/index'
import { store, getUsers, StateMain } from '../modules'
import { UsersList } from './components/users-list'
import { ChildElement } from '@lib/types'

export function Main (): HTMLElement {
  const render = (state: StateMain): { content: string, children: ChildElement[] } => {
    return {
      content: state.loading
        ? 'Loading...'
        : state.error != null
          ? state.error
          : 'Users list',
      children: (!state.loading && (state.users != null)) ? [UsersList(state.users)] : []
    }
  }

  return createComponent({
    content: 'Home page',
    children: [
      observe({
        store,
        props: { content: 'list users' },
        render
      }),
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
