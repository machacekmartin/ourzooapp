import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Intro from '../views/Intro.vue'

import ZooHome from '../views/ZooHome.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Intro',
        component: Intro,
        
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/zoo/:id/home',
        name: 'Zoo Home',
        component: ZooHome,
        meta: {
            activeZooNeeded: true,
        }
    },
    {
        path: '/about',
        name: 'About',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    },
    {
        path: '/zoo/:id/map',
        name: 'Zoo Map',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/Map.vue')
        }
    },
    {
        path: '/zoo/:id/species',
        name: 'Zoo Species',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/ZooSpecies.vue')
        }
    },
    {
        path: '/zoo/:id/species/:detailId',
        name: 'Zoo One Species',
        component: function () {
            return import( /* webpackChunkName: "about" */ '../views/ZooOneSpecies.vue')
        }
    },
]

const router = new VueRouter({
    routes
})



export default router