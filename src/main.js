import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueSocketIO from "vue-3-socket.io";

const app = createApp(App)
  .use(router)
  .use(
    new VueSocketIO({
      debug: false,
      connection: "https://console.pengucc.com/",
      options: { path: "/api/socket.io/" },
    })
  );

app.mount("#app");
