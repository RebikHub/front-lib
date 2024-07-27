import { createState } from '@lib/index'

export interface StateMain {
  users: Array<{ name: string }> | null
  loading: boolean
  error: string | null
}

export const store = createState<StateMain>({
  users: null,
  loading: false,
  error: null
})

export const getUsers: () => Promise<void> = async () => {
  store.set({ loading: true, users: null, error: null })
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()
    store.set({ users: data })
  } catch (error) {
    store.set({ error: 'Failed to fetch users' })
    console.error('fetch error:', error)
  } finally {
    store.set({ loading: false })
  }
}
