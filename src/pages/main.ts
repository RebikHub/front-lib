import { createComponent } from '../../lib/component'
import { createState } from '../../lib/state-func'

interface State {
  users: any
  loading: boolean
}

const store = createState<State>({
  users: null,
  loading: false
})

const getUsers: () => Promise<void> = async () => {
  store.setState({ ...store.getState(), loading: true })
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    store.setState({ ...store.getState(), loading: false })
    console.error('fetch error')
    return
  }

  const data = await response.json()
  console.log('data: ', data)

  store.setState({ users: data, loading: false })
}

export function Main (): HTMLElement {
  const element = createComponent({
    tag: 'div',
    content: 'list users'
  })

  store.addObserver((state: State) => {
    console.log(state)
    element.textContent = state.loading ? 'Loading...' : 'Users list'

    if (state.users != null) {
      const fragment = document.createDocumentFragment()

      fragment.appendChild(createComponent({
        tag: 'ul',
        children: [...state.users.map(({ name }: any) => createComponent({
          tag: 'li',
          content: name
        }))]
      }))

      element.appendChild(fragment)
    }
  })
  return createComponent({
    tag: 'p',
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
