export interface HTMLAttributesBase {
  // Общие атрибуты
  accessKey?: string
  className?: string
  classNames?: string[] | string
  contentEditable?: boolean | 'true' | 'false'
  dir?: 'ltr' | 'rtl' | 'auto'
  draggable?: boolean
  hidden?: boolean
  id?: string
  lang?: string
  spellcheck?: boolean
  style?: string | CSSStyleDeclaration
  tabIndex?: number
  title?: string
  // Specific

  // FormAttributes
  action?: string
  method?: 'get' | 'post'
  autoComplete?: 'on' | 'off'
  encType?: string
  noValidate?: boolean

  // Для элемента <label>
  htmlFor?: string

  // Для элемента <div>
  role?: 'button' | 'tabpanel' | 'presentation' | 'none'
  ariaLabel?: string
  ariaHidden?: boolean
  ariaExpanded?: boolean

  // Для элемента <input>
  typeText?: 'text' | 'password' | 'number' | 'checkbox' | 'radio' | 'submit' | 'reset' | 'file' | 'button' | 'date' | 'email' | 'url' | 'tel' | 'search' | 'color'
  value?: string | number
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean

  // Для элемента <a>
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  download?: string
  rel?: string

  // Для элемента <button>
  typeButton?: 'button' | 'submit' | 'reset'

  // Для элемента <img>
  src?: string
  alt?: string
  width?: number
  height?: number
  loading?: 'auto' | 'lazy' | 'eager'
}

export type ChildElement = HTMLElement | HTMLElement[] | (() => HTMLElement | ChildElement | ChildElement[])

type EventHandlerMap = {
  [K in keyof GlobalEventHandlersEventMap]?: (event?: Event) => void;
}

export type ComponentOptions = {
  tag?: keyof HTMLElementTagNameMap
  content?: string
  children?: ChildElement[]
  events?: EventHandlerMap
} & HTMLAttributesBase

export interface IStateManager<T> {
  state: T
  readonly observers: Array<Observer<T>>
  addObserver: (observer: Observer<T>) => void
  notifyObservers: (changedProperties: string[]) => void
  setState: (newState: Partial<T>) => void
  getState: () => T
}

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
}

export type Observer<T> = (state: T) => void
