export function component({
  elementName = "div",
  classNames,
  textContent,
  children,
  href = "",
  target = "_blank",
  onClick,
}) {
  const element = document.createElement(elementName);

  if (elementName === "a") {
    element.href = href;
    element.target = target;
  }

  if (classNames) {
    element.classList.add(...classNames.split(" "));
  }

  if (typeof onClick === "function") {
    element.addEventListener("click", onClick);
  }

  element.textContent = textContent || "";

  if (children && Array.isArray(children)) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
}

export function App(parentId, children) {
  const app = document.getElementById(parentId);

  console.log('app: ', app);

  if (children && Array.isArray(children)) {
    children.forEach((child) => {
      app.appendChild(child);
    });
  }
}
