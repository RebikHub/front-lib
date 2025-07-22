export type ChildElement =
  | HTMLElement
  | HTMLElement[]
  | (() => HTMLElement | ChildElement | ChildElement[])
  | null
  | DocumentFragment
  | DocumentFragment[];

export interface IStateManager<T> {
  state: T;
  readonly observers: Array<Observer<T>>;
  addObserver: (observer: Observer<T>) => void;
  notifyObservers: (changedProperties: string[]) => void;
  setState: (newState: Partial<T>) => void;
  getState: () => T;
}

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Observer<T> = (state: T) => void;

export interface StateReturn<T> {
  get: () => T;
  set: (newState: Partial<T>) => void;
  add: (name: string, observer: Observer<T>) => void;
  remove: (name: string) => void;
  state: Writable<T>;
}

export interface ObserveProps<S, T extends keyof HTMLElementTagNameMap> {
  store: StateReturn<S>;
  props: ComponentOptions<T>;
  render: (state: S) => ComponentOptions<T>;
}

export type ComponentOptions<T extends keyof HTMLElementTagNameMap> = {
  tag?: T;
  content?: string;
  children?: ChildElement[];
  events?: { [key in keyof GlobalEventHandlersEventMap]?: EventListener };
} & (T extends "a"
  ? AnchorAttributes
  : T extends "img"
  ? ImageAttributes
  : T extends "input"
  ? InputAttributes
  : T extends "form"
  ? FormAttributes
  : T extends "button"
  ? ButtonAttributes
  : T extends "label"
  ? LabelAttributes
  : T extends "div"
  ? DivAttributes
  : T extends "video"
  ? VideoAttributes
  : T extends "audio"
  ? AudioAttributes
  : T extends "select"
  ? SelectAttributes
  : T extends "option"
  ? OptionAttributes
  : T extends "textarea"
  ? TextareaAttributes
  : HTMLAttributesBase);

export type HTMLAllAttributes =
  | AnchorAttributes
  | ImageAttributes
  | InputAttributes
  | FormAttributes
  | ButtonAttributes
  | LabelAttributes
  | DivAttributes
  | VideoAttributes
  | AudioAttributes
  | SelectAttributes
  | OptionAttributes
  | TextareaAttributes;

// Базовый интерфейс для общих атрибутов
export interface HTMLAttributesBase {
  class?: string;
  classes?: string[];
  id?: string;
  style?: string;
  title?: string;
  lang?: string;
  dir?: string;
  hidden?: boolean;
  tabindex?: number;
  accesskey?: string;
  contenteditable?: boolean;
  draggable?: boolean;
  spellcheck?: boolean;
}

// Интерфейс для тега <a> (гиперссылка)
export interface AnchorAttributes extends HTMLAttributesBase {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  download?: string;
  rel?: string;
  type?: string;
}

// Интерфейс для тега <img> (изображение)
export interface ImageAttributes extends HTMLAttributesBase {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

// Интерфейс для тега <input> (поле ввода)
export interface InputAttributes extends HTMLAttributesBase {
  type?:
    | "text"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "submit"
    | "reset"
    | "file"
    | "button"
    | "date"
    | "email"
    | "url"
    | "tel"
    | "search"
    | "color";
  name?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  checked?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  autocomplete?: string;
  autofocus?: boolean;
  multiple?: boolean;
  size?: number;
  accept?: string;
  capture?: string;
}

// Интерфейс для тега <form> (форма)
export interface FormAttributes extends HTMLAttributesBase {
  action?: string;
  method?: "get" | "post";
  enctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  novalidate?: boolean;
}

// Интерфейс для тега <button> (кнопка)
export interface ButtonAttributes extends HTMLAttributesBase {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  autofocus?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  name?: string;
  value?: string;
}

// Интерфейс для тега <label> (метка)
export interface LabelAttributes extends HTMLAttributesBase {
  for?: string;
}

// Интерфейс для тега <div> (блочный контейнер)
export interface DivAttributes extends HTMLAttributesBase {
  role?: "button" | "tabpanel" | "presentation" | "none";
  ariaLabel?: string;
  ariaHidden?: boolean;
  ariaExpanded?: boolean;
}

// Интерфейс для тега <video> (видео)
export interface VideoAttributes extends HTMLAttributesBase {
  src?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: "none" | "metadata" | "auto";
  width?: number;
  height?: number;
}

// Интерфейс для тега <audio> (аудио)
export interface AudioAttributes extends HTMLAttributesBase {
  src?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
}

// Интерфейс для тега <select> (выпадающий список)
export interface SelectAttributes extends HTMLAttributesBase {
  name?: string;
  multiple?: boolean;
  size?: number;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  form?: string;
}

// Интерфейс для тега <option> (элемент выпадающего списка)
export interface OptionAttributes extends HTMLAttributesBase {
  value?: string;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
}

// Интерфейс для тега <textarea> (многострочное текстовое поле)
export interface TextareaAttributes extends HTMLAttributesBase {
  name?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  maxlength?: number;
  minlength?: number;
  wrap?: "soft" | "hard";
}

export type Methods = "get" | "delete" | "post" | "put" | "patch";

export type RequestMethodInit = <T>(
  endpoint: string,
  methodConfig?: RequestInit,
  urlParams?: Record<string, string>,
  queryParams?: Record<string, string>
) => Promise<T>;
