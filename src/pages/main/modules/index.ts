import { createState } from '@lib/index'

export interface StateMain {
  users: Array<{ name: string }> | null
  loading: boolean
  error: string | null
}

export const { set, add } = createState<StateMain>({
  users: null,
  loading: false,
  error: null
})

export const getUsers: () => Promise<void> = async () => {
  set({ loading: true, users: null, error: null })
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()
    set({ users: data, loading: false, error: null })
  } catch (error) {
    set({ loading: false, error: 'Failed to fetch users' })
    console.error('fetch error:', error)
  }
}
