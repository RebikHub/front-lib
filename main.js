import './style.css';
import { createRouter } from './lib/routing';
import { App, component } from './lib/component';
import { StateManager, StateObserver } from './lib/state';
import { Button } from './button';

const stateManager = new StateManager({ count: 0 });
const observer = new StateObserver(stateManager);

const router = createRouter();

router.addRoute('/about', () => component({
  elementName: 'p',
  textContent: 'About us'
}));

router.addRoute('/main', () => component({
  elementName: 'p',
  textContent: 'Home page'
}));

router.addRoute('/', () => component({
  elementName: 'div',
  classNames: '',
  textContent: 'This is a custom lib for ui',
  children: [
    observer.observeElement(component({
      elementName: 'p',
      textContent: '',
      update: (newState) => ({ textContent: `${newState.count}` }),
    })),
    component({
      classNames: 'buttons',
      children: [
        component({
          elementName: 'button',
          textContent: 'Increment',
          onClick: () => stateManager.setState({
            count: stateManager.getState().count + 1,
          }),
        }),
        component({
          elementName: 'button',
          textContent: 'Decrement',
          onClick: () => stateManager.setState({
            count: stateManager.getState().count - 1,
          }),
        }),
      ],
    }),
  ],
}));

App('app', [
  Button({
    title: 'About',
    onClick: () => router.navigateTo('/about')
  }),
  Button({
    title: 'Main',
    onClick: () => router.navigateTo('/main')
  }),
  Button({
    title: 'Home',
    onClick: () => router.navigateTo('/')
  }),
  component({
    elementName: 'h1',
    classNames: 'fa',
    textContent: 'Hello Vanilla!',
  }),
  router.parentElement(component({classNames: ''})),
]);
