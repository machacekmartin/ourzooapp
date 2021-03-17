import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Intro from '../views/Intro.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Intro',
        component: Intro
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    },
    {
        path: '/map',
        name: 'Map',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/Map.vue')
        }
    },
]

const router = new VueRouter({
    routes
})

export default router