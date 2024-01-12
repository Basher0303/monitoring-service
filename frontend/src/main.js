import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './plugins/api'

const app = createApp(App);

app.use(router);
app.use(store);
app.use(api);

app.mount('#app');
