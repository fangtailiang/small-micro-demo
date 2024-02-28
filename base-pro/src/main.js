import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import microApp from '@micro-zoe/micro-app'
import { watchErr } from "./watchErr"
const pinia = createPinia()
const app =createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')

microApp.start()
watchErr(app);