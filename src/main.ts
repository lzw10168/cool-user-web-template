import './assets/main.css'

import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { bootstrap } from "/@/cool/bootstrap";

import App from './App.vue'
import router from './router'

const app = createSSRApp(App);
// 启动
	bootstrap(app);

app.use(createPinia())
app.use(router)

app.mount('#app')
