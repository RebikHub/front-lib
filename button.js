import { component } from "./lib/component";

export function Button({title, onClick}) {

  return component({
  elementName: 'button',
  textContent: title,
  onClick
})
}