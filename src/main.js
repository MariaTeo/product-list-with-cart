import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
