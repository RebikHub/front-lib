import { component } from "./lib/component";
import { createRouter } from "./lib/routing";

const router = createRouter();

router.addRoute('/about', () => component({
  elementName: 'p',
  textContent: 'About us'
}));

router.addRoute('/main', () => component({
  elementName: 'p',
  textContent: 'Home page'
}));

router.startRouter();