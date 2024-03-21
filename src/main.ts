import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { i18n, pinia, router, villus } from "./modules";
import App from "./App.vue";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./style.css";
import "uno.css";

createApp(App)
  .use(Quasar, {
    plugins: { Notify },
  })
  .use(villus)
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount("#app");
