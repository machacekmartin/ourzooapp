import { http } from "@/services/axios";

const state = {
    expositions: [],
};
const getters = {
    expositions: state => state.expositions,
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

    async ResetExpositions({ commit }){
        commit("setExpositions", null);
    },
};
const mutations = {
    setExpositions(state, expositions) {
        state.expositions = expositions;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
