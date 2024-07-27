# CRS-Arch Library

CRS-Arch is a lightweight library for building reactive web applications using a component-based architecture. It provides utilities for creating state management, reactive components, and initializing your application. Additionally, it includes a simple yet powerful router for handling navigation within your application.

## Features

- **State Management**: Easily create and manage application state.
- **Reactive Components**: Build components that react to state changes.
- **Component Composition**: Compose complex UIs from simple components.
- **Event Handling**: Attach event listeners to components for interactivity.
- **Routing**: Manage navigation with a straightforward router.

## Installation

To install CRS-Arch, use npm or yarn:

```bash
npm install crs-arch
```

## Usage

Below is a simple example demonstrating how to use CRS-Arch to build a reactive application with routing.

### Example

#### State Management and Components

```javascript
import { createComponent, createState, initApp, observe } from 'crs-arch'
import { ComponentOptions } from 'crs-arch/types'

interface initialState {
  count: number
}

const store = createState<initialState>({
  count: 0
})

const LinkImage = ({ href, className, alt, srcLogic }: any): HTMLElement => {
  const props: ComponentOptions<'img'> = {
    tag: 'img',
    class: className,
    alt,
    src: srcLogic(store.state.count)
  }
  const render = (state: initialState): { src: string } => ({ src: srcLogic(state.count) })

  return createComponent({
    tag: 'a',
    href,
    children: [observe({
      store,
      props,
      render
    })]
  })
}

const CounterButton = (): HTMLElement => {
  const props: ComponentOptions<'button'> = {
    tag: 'button',
    id: 'counter',
    type: 'button',
    content: `count is ${store.state.count}`,
    events: {
      click: () => store.set({ count: store.state.count + 1 })
    }
  }

  const render = (state: initialState): { content: string } => ({ content: `count is ${state.count}` })

  return observe({
    store,
    props,
    render
  })
}

const App = (): HTMLElement =>
  createComponent({
    children: [
      LinkImage({
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        className: 'logo',
        alt: 'JavaScript logo',
        srcLogic: (count: number) => (count % 2 === 0 ? javascriptLogo : viteLogo)
      }),
      LinkImage({
        href: 'https://vitejs.dev',
        className: 'logo vanilla',
        alt: 'Vite logo',
        srcLogic: (count: number) => (count % 2 !== 0 ? javascriptLogo : viteLogo)
      }),
      createComponent({
        tag: 'h1',
        content: 'Hello Vite!'
      }),
      createComponent({
        class: 'card',
        children: [CounterButton]
      }),
      createComponent({
        tag: 'p',
        class: 'read-the-docs',
        content: 'Click on the Vite logo to learn more'
      })
    ]
  })

initApp('app', [App])
```

#### Routing

```javascript
// routes.ts
import { createRouter } from 'crs-arch'
import { About } from './pages/about'
import { Home } from './pages/home'
import { Main } from './pages/main/view/main'

export const { add, layout, navigate, start } = createRouter()

add('/about', About)
add('/main', Main)
add('/', Home)

// layout.ts
import { createComponent } from 'crs-arch'
import { layout } from './routes'
import './style.css'

export function RootLayout (): HTMLElement {
  return layout(createComponent({
    class: 'layout'
  }))
}

// navigation.ts
import { createComponent } from 'crs-arch'
import { Button } from '../button/button'
import { navigate } from './routes'

export function Navigation (): HTMLElement {
  return createComponent({
    tag: 'header',
    class: 'navigation',
    children: [
      Button({
        title: 'About',
        onClick: () => navigate('/about')
      }),
      Button({
        title: 'Main',
        onClick: () => navigate('/main')
      }),
      Button({
        title: 'Home',
        onClick: () => navigate('/')
      })
    ]
  })
}

// main.ts
import { initApp } from 'crs-arch'
import { Navigation } from './components/navigation/navigation'
import { Title } from './components/title/title'
import { start } from './routes'
import { RootLayout } from './layout/root-layout'

initApp('app', [
  Navigation,
  Title,
  RootLayout
])

start()
```

### Explanation

1. **State Management**: The `createState` function initializes the application state.
2. **Reactive Components**: The `observe` function makes components reactive to state changes.
3. **Component Composition**: The `createComponent` function is used to compose components.
4. **Event Handling**: Event listeners are attached to components using the `events` property.
5. **Routing**: The `createRouter` function sets up the router, and `add` adds routes. The `navigate` function handles navigation, and `layout` defines the layout structure.

## API Reference

### `createState<T>(initialState: T): { state: T, set: (newState: Partial<T>) => void }`

Creates a state management object with the initial state and a setter function.

### `createComponent(options: ComponentOptions<T>): HTMLElement`

Creates a new component with the given options.

### `observe({ store, props, render }: { store: { state: T, set: (newState: Partial<T>) => void }, props: ComponentOptions<T>, render: (state: T) => Partial<ComponentOptions<T>> }): HTMLElement`

Makes a component reactive by observing the state changes and re-rendering the component accordingly.

### `initApp(rootId: string, components: Array<() => HTMLElement>): void`

Initializes the application by rendering the provided components into the specified root element.

### `createRouter(): { add: (path: string, component: () => HTMLElement) => void, layout: (layout: HTMLElement) => HTMLElement, navigate: (path: string) => void, start: () => void }`

Creates a router instance with methods to add routes, define layout, navigate, and start the router.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
