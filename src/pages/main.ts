import { createComponent, createState } from 'crs-arch'

interface State {
  users: Array<{ name: string }> | null
  loading: boolean
  error: string | null
}

const store = createState<State>({
  users: null,
  loading: false,
  error: null
})

const getUsers: () => Promise<void> = async () => {
  store.setState({ loading: true, users: null, error: null })
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()
    store.setState({ users: data, loading: false, error: null })
  } catch (error) {
    store.setState({ loading: false, error: 'Failed to fetch users' })
    console.error('fetch error:', error)
  }
}

const renderUsersList = (users: Array<{ name: string }> | null): DocumentFragment => {
  const fragment = document.createDocumentFragment()
  if (users != null) {
    users.forEach(({ name }) => {
      const li = createComponent({ tag: 'li', content: name })
      fragment.appendChild(li)
    })
  }
  return fragment
}

export function Main (): HTMLElement {
  const element = createComponent({ content: 'list users' })

  store.addObserver((state: State) => {
    element.textContent = state.loading
      ? 'Loading...'
      : state.error != null
        ? state.error
        : 'Users list'

    if (!state.loading && (state.users != null)) {
      const usersList = renderUsersList(state.users)
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
