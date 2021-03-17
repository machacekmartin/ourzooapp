import { http } from "@/services/axios";

const state = {
    zoos: null
};
const getters = {
    zoos: state => state.zoos
};
const actions = {
    async LoadZoos({ commit }) {
        const zoos = (await http.get("/api/zoos")).data;
        commit("setZoos", zoos);
    },
};
const mutations = {
    setZoos(state, zoos) {
        state.zoos = zoos;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
