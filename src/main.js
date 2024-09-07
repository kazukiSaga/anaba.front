import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//追加
import vuetify from "./plugins/vuetify";

const app = createApp(App)

app.use(createPinia())
//修正
app.use(router);
//追加
app.use(vuetify).mount("#app");
