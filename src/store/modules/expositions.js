import { http } from "@/services/axios";
import { assignDistances } from "@/services/distance";

const state = {
    expositions: [],
    exposition: null
};
const getters = {
    expositions: state => state.expositions,
    exposition: state => state.exposition,
    expositionsSortedByDistance: (state, getters, rootState, rootGetters) => {
        const currentLocation = rootGetters['location/location'];
        if (currentLocation){
            let expositionsWithDistances = assignDistances(state.expositions, currentLocation);
            
            return expositionsWithDistances.sort((a, b) => {
                return a.distance - b.distance;
            });
        }
        else{
            return state.expositions;
        }
    },
};
const actions = {
    async LoadExpositions({ commit }, zooId) {
        const expositions = (
            await http.get(
                "/api/zoos/" +zooId+ "/expositions"
            )
        ).data;
        commit("setExpositions", expositions);
    },

    async LoadExposition({ commit }, expositionId) {
        const exposition = (
            await http.get(
                "/api/expositions/" + expositionId
            )
        ).data;
        commit("setExposition", exposition);
    },

    async ResetExpositions({ commit }){
        commit("setExpositions", null);
    },
};
const mutations = {
    setExpositions(state, expositions) {
        state.expositions = expositions;
    },
    setExposition(state, exposition){
        state.exposition = exposition;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
