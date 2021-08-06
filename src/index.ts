import { createApp, provide } from "vue";
import App from "./App.vue";

const app = createApp(App)
app.provide("serverUrl", "http://127.0.0.1:3000/")
app.mount("#app");