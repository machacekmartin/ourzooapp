import Vue from 'vue'
import Vuex from 'vuex'

import permissions from './modules/permissions';
import location from './modules/location';
import zoos from './modules/zoos';
import announcements from './modules/announcements';
import species from './modules/species';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        permissions,
        location,
        zoos,
        announcements,
        species
    }
})
