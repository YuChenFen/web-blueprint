import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

// 消息通知
import "./js/message"

// 样式
import "./components/nodes/style.css";
import NODE_JAVASCRIPT from './components/nodes/javascript';
import NODE_HTML from './components/nodes/html';
import NODE_CSS from './components/nodes/css';
import EDGE from './components/edges';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(NODE_JAVASCRIPT)
app.use(NODE_HTML)
app.use(NODE_CSS)
app.use(EDGE)
app.mount('#app')
