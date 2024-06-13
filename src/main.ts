import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { i18n, pinia, router, villus } from "./modules";
import App from "./App.vue";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";

import "quasar/src/css/index.sass";
import "@quasar/extras/mdi-v6/mdi-v6.css";

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
