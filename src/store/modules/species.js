import { http } from "@/services/axios";
import { assignDistances } from "@/services/distance";
import { sortByDistance } from "@/services/sort";

const state = {
    species: [],
    oneSpecies: null
};
const getters = {
    species: state => state.species,
    oneSpecies: state => state.oneSpecies,
    speciesSortedByDistance: (state, getters, rootState, rootGetters) => {
        const currentLocation = rootGetters['location/location'];
        if (currentLocation){
            let speciesWithDistances = assignDistances(state.species, currentLocation);
            return sortByDistance(speciesWithDistances);
        }
        else{
            return state.species;
        }
    },
};
const actions = {
    async LoadSpecies({ commit }, zooId) {
        const species = (
            await http.get(
                "/api/zoos/" +zooId+ "/species"
            )
        ).data;
        commit("setSpecies", species);
    },

    async LoadOneSpecies({ commit }, speciesId) {
        const oneSpecies = (
            await http.get(
                "/api/species/" +speciesId
            )
        ).data;
        commit("setOneSpecies", oneSpecies);
    },

    async ResetSpecies({ commit }){
        commit("setSpecies", null);
    },
};
const mutations = {
    setSpecies(state, species) {
        state.species = species;
    },
    setOneSpecies(state, oneSpecies) {
        state.oneSpecies = oneSpecies;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
