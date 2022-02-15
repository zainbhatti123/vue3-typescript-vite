import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/style.css';

const myApp = createApp(App);

myApp.use(router);
myApp.use(store);

myApp.mount('#app')
