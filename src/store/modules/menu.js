const state = {
    isActive: false,
    isOverflowHidden: false,
};
const getters = {
    isActive: state => state.isActive,
    isOverflowHidden: state => state.isOverflowHidden
};
const actions = {
    UpdateIsActive({ commit }, value){
        commit('setIsActive', value);
        if (value){
            commit('setIsOverflowHidden', true)
        }
        else{
            setTimeout(() => {
                commit('setIsOverflowHidden', false)
            }, 250);
        }
    },
};
const mutations = {
    setIsActive(state, isActive) {
        state.isActive = isActive;
    },
    setIsOverflowHidden(state, isOverflowHidden) {
        state.isOverflowHidden = isOverflowHidden;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
