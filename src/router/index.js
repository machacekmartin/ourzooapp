import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Intro from '../views/Intro.vue'


import ZooHome from '../views/ZooHome.vue'
import ZooSpecies from '../views/ZooSpecies.vue'
import ZooOneSpecies from '../views/ZooOneSpecies.vue'
import ZooMap from '../views/Map.vue'


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
    },
    {
        path: '/zoo/:id/map',
        name: 'Zoo Map',
        component: ZooMap
    },
    {
        path: '/zoo/:id/species',
        name: 'Zoo Species',
        component: ZooSpecies
    },
    {
        path: '/zoo/:id/species/:detailId',
        name: 'Zoo One Species',
        component: ZooOneSpecies
    },
]

const router = new VueRouter({
    routes,
})



export default router