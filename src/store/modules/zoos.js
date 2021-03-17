import { http } from "@/services/axios";

const state = {
    zoos: null,
    zoo: null,
};
const getters = {
    zoos: state => state.zoos,
    zoo: state => state.zoo
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
