import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/intro',
    name: 'Intro',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Intro.vue')
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Map.vue')
    }
  },

]

const router = new VueRouter({
  routes
})

export default router
