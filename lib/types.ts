export interface HTMLAttributesBase {
  // Общие атрибуты
  accessKey?: string
  className?: string
  classNames?: string[]
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

  // События
  onAbort?: (event: Event) => void
  onAnimationCancel?: (event: AnimationEvent) => void
  onAnimationEnd?: (event: AnimationEvent) => void
  onAnimationIteration?: (event: AnimationEvent) => void
  onAnimationStart?: (event: AnimationEvent) => void
  onBlur?: (event: FocusEvent) => void
  onCanPlay?: (event: Event) => void
  onCanPlayThrough?: (event: Event) => void
  onChange?: (event: Event) => void
  onClick?: (event: MouseEvent) => void | EventListenerOrEventListenerObject
  onContextMenu?: (event: MouseEvent) => void
  onCopy?: (event: ClipboardEvent) => void
  onCut?: (event: ClipboardEvent) => void
  onDoubleClick?: (event: MouseEvent) => void
  onDrag?: (event: DragEvent) => void
  onDragEnd?: (event: DragEvent) => void
  onDragEnter?: (event: DragEvent) => void
  onDragExit?: (event: DragEvent) => void
  onDragLeave?: (event: DragEvent) => void
  onDragOver?: (event: DragEvent) => void
  onDragStart?: (event: DragEvent) => void
  onDrop?: (event: DragEvent) => void
  onDurationChange?: (event: Event) => void
  onEmptied?: (event: Event) => void
  onEnded?: (event: Event) => void
  onError?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onInput?: (event: Event) => void
  onInvalid?: (event: Event) => void
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyPress?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent) => void
  onLoad?: (event: Event) => void
  onLoadStart?: (event: Event) => void
  onLoadedData?: (event: Event) => void
  onLoadedMetadata?: (event: Event) => void
  onMouseDown?: (event: MouseEvent) => void
  onMouseEnter?: (event: MouseEvent) => void
  onMouseLeave?: (event: MouseEvent) => void
  onMouseMove?: (event: MouseEvent) => void
  onMouseOut?: (event: MouseEvent) => void
  onMouseOver?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onPaste?: (event: ClipboardEvent) => void
  onPause?: (event: Event) => void
  onPlay?: (event: Event) => void
  onPlaying?: (event: Event) => void
  onProgress?: (event: ProgressEvent) => void
  onRateChange?: (event: Event) => void
  onReset?: (event: Event) => void
  onScroll?: (event: Event) => void
  onSeeked?: (event: Event) => void
  onSeeking?: (event: Event) => void
  onStalled?: (event: Event) => void
  onSubmit?: (event: Event) => void
  onSuspend?: (event: Event) => void
  onTimeUpdate?: (event: Event) => void
  onToggle?: (event: Event) => void
  onTransitionCancel?: (event: TransitionEvent) => void
  onTransitionEnd?: (event: TransitionEvent) => void
  onTransitionRun?: (event: TransitionEvent) => void
  onTransitionStart?: (event: TransitionEvent) => void
  onVolumeChange?: (event: Event) => void
  onWaiting?: (event: Event) => void
  onWheel?: (event: WheelEvent) => void
}
