import Home from './components/Home.vue';
import Checkout from './components/Checkout.vue';
import Congratulations from './components/Congratulations.vue';
import { createRouter , createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: {
            default: Home
        },
        redirect : {
            name : 'products'
        }
    },
    {
        path:'/products',
        name: 'products',
        component: Home
    },
    {
        path:'/checkout',
        name: 'checkout',
        component: Checkout
    },
    {
        path:'/congratulations',
        name: 'congratulations',
        component: Congratulations
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;