const state = {
    location: null,
};
const getters = {
    location: state => state.location,
};
const actions = {
    async UpdateLocation({ commit }, location) {
        commit('setLocation', location)
    },
};
const mutations = {
    setLocation(state, location) {
        state.location = location;
        
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
