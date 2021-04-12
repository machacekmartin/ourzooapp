import { http } from "@/services/axios";
import { assignDistances } from "@/services/distance";
import { sortByDistance } from "@/services/sort";

const state = {
    zoos: null,
    zoo: null,
};
const getters = {
    zoos: state => state.zoos,
    zoo: state => state.zoo,
    zoosSortedByDistance: (state, getters, rootState, rootGetters) => {
        const currentLocation = rootGetters['location/location'];
        if (currentLocation){
            let zoosWithDistances = assignDistances(state.zoos, currentLocation);

            return sortByDistance(zoosWithDistances);
        }
        else{
            return state.zoos;
        }
    },
};
const actions = {
    async LoadZoos({ commit }) {
        const zoos = (await http.get("/api/zoos")).data;
        commit("setZoos", zoos);
    },
    async LoadZoo({ commit }, zooId) {
        const zoo = (await http.get("/api/zoos/"+zooId)).data;
        commit("setZoo", zoo);
    },
    async ResetZoo({ commit }){
        commit("setZoo", null);
    }
};
const mutations = {
    setZoos(state, zoos) {
        state.zoos = zoos;
    },
    setZoo(state, zoo) {
        state.zoo = zoo;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
