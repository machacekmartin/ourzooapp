import { http } from "@/services/axios";

const state = {
    facilities: [],
};
const getters = {
    facilities: state => state.facilities,
};
const actions = {
    async LoadFacilities({ commit }, zooId) {
        const facilities = (
            await http.get(
                "/api/zoos/" +zooId+ "/facilities"
            )
        ).data;
        commit("setFacilities", facilities);
    },

    async ResetFacilities({ commit }){
        commit("setFacilities", null);
    },
};
const mutations = {
    setFacilities(state, facilities) {
        state.facilities = facilities;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
