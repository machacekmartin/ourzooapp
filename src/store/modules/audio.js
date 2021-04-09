const state = {
    target: null,
    isPlaying: false
};
const getters = {
    target: state => state.target,
    isPlaying: state => state.isPlaying,
};
const actions = {
    setTarget({ commit }, target){
        commit('setTarget', target);
    },
    updateIsPlaying({ commit }, isPlaying){
        commit('setIsPlaying', isPlaying);
    },
};
const mutations = {
    setTarget(state, target) {
        state.target = target;
    },
    setIsPlaying(state, isPlaying) {
        state.isPlaying = isPlaying;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
