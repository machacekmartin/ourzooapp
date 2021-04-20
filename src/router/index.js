import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Intro from '../views/Intro.vue'

import ZooHome from '../views/ZooHome.vue'
import ZooSpecies from '../views/ZooSpecies.vue'
import ZooOneSpecies from '../views/ZooOneSpecies.vue'
import ZooExpositions from '../views/ZooExpositions.vue'
import ZooExposition from '../views/ZooExposition.vue'
import ZooEvents from '../views/ZooEvents.vue'
import ZooAnnouncements from '../views/ZooAnnouncements.vue'
import ZooInfo from '../views/ZooInfo.vue'

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
    {
        path: '/zoo/:id/expositions',
        name: 'Zoo Expositions',
        component: ZooExpositions
    },
    {
        path: '/zoo/:id/exposition/:detailId',
        name: 'Zoo Exposition',
        component: ZooExposition
    },
    {
        path: '/zoo/:id/announcements',
        name: 'Zoo Announcements',
        component: ZooAnnouncements
    },
    {
        path: '/zoo/:id/events',
        name: 'Zoo Events',
        component: ZooEvents
    },
    {
        path: '/zoo/:id/info',
        name: 'Zoo Info',
        component: ZooInfo
    },
]

const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name == 'Intro' && localStorage.getItem('introPassed')){
        next({name: 'Home'})
    }
    else{
        next()
    }
});



export default router