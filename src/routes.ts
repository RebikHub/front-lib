import { createRouter } from "../lib";
import { App } from "./observeMain";
import { About } from "./pages/about";
import { Home } from "./pages/home";
import { Main } from "./pages/main/view/main";

export const { add, layout, navigate, start } = createRouter();

[
  { route: "/switch", component: App },
  { route: "/about", component: About },
  { route: "/main", component: Main },
  { route: "/", component: Home },
].forEach(({ route, component }) => add(route, component));
