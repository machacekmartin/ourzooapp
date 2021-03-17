import Vue from 'vue'
import Vuex from 'vuex'

import permissions from './modules/permissions';
import zoos from './modules/zoos';
import announcements from './modules/announcements';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        permissions,
        zoos,
        announcements,
    }
})
