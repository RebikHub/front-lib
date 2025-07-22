import "./style.css";
import javascriptLogo from "../public/javascript.svg";
import viteLogo from "../public/vite.svg";
import { createComponent, createState, observe } from "@lib/index";

interface initialState {
  count: number;
}

const store = createState<initialState>({
  count: 0,
});

const LinkImage = ({ href, className, alt, srcLogic }: any): HTMLElement =>
  createComponent({
    tag: "a",
    href,
    children: [
      observe({
        store,
        props: {
          tag: "img",
          class: className,
          alt,
          src: srcLogic(store.state.count),
        },
        render: (state: initialState): { src: string } => ({
          src: srcLogic(state.count),
        }),
      }),
    ],
  });

const CounterButton = (): HTMLElement =>
  observe({
    store,
    props: {
      tag: "button",
      id: "counter",
      type: "button",
      content: `count is ${store.state.count}`,
      events: {
        click: () => store.set({ count: store.state.count + 1 }),
      },
    },
    render: (state: initialState): { content: string } => ({
      content: `count is ${state.count}`,
    }),
  });

const createUseState = <T>(
  state: T
): [T, (callback: T | ((prevState: T) => T)) => void] => {
  let curState = state;

  const callback = (prev: T | ((prevState: T) => T)): void => {
    if (typeof prev === "function") {
      curState = (prev as (prevState: T) => T)(curState);
    } else {
      curState = prev;
    }
  };

  return [curState, callback];
};

export const App = (): HTMLElement => {
  const [click, setClick] = createUseState<number>(0);
  console.log("state value: ", click);
  // console.log('state setter: ', setClick)

  return createComponent({
    children: [
      LinkImage({
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        className: "logo",
        alt: "Vite logo",
        srcLogic: (count: number) =>
          count % 2 === 0 ? javascriptLogo : viteLogo,
      }),
      LinkImage({
        href: "https://vitejs.dev",
        className: "logo vanilla",
        alt: "JavaScript logo",
        srcLogic: (count: number) =>
          count % 2 !== 0 ? javascriptLogo : viteLogo,
      }),
      createComponent({
        tag: "h5",
        content: "Hello Vite!",
      }),
      createComponent({
        class: "card",
        children: [CounterButton],
      }),
      createComponent({
        tag: "p",
        class: "read-the-docs",
        content: `Click on the Vite logo to learn more & ${click}`,
        events: {
          click: () => {
            console.log("click", click);

            setClick((prev: number): number => {
              console.log("setClick event: ", prev);
              return prev + 1;
            });
          },
        },
      }),
    ],
  });
};
