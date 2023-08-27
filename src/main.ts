import { createApp } from 'vue';
import pinia from './store/store';
import lazyPlugin from 'vue3-lazy';
import App from './App.vue'
import router from './route';
import TypeNav from "@/components/TypeNav.vue";
import Carousel from '@/components/Carousel.vue';
import Pagination from '@/components/Pagination.vue';

import '@/mock/mockServer.js'


const app = createApp(App);
app.use(pinia);
app.component('TypeNav', TypeNav)
app.component('Carousel', Carousel)
app.component('Pagination', Pagination)
app.use(router);
app.use(lazyPlugin, {
  loading: 'images/loading.png',
  error: 'images/error.png'
})

app.mount('#app');