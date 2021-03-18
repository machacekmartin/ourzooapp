import { http } from "@/services/axios";

const state = {
    species: [],
};
const getters = {
    species: state => state.species,
    calculateDistance: () => (source, target) => {
        let lat1 = Math.PI * source.lat / 180;
        let lat2 = Math.PI * target.lat / 180;

        let lng1 = Math.PI * source.lng / 180;
        let lng2 = Math.PI * target.lng / 180;

        let theta = lng1 - lng2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(radtheta);
        dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515 * 1.609344;
        return dist;
    },
    speciesWithDistance: (state, getters, rootState, rootGetters) => {
        const currentLocation = rootGetters['location/location'];
        if (currentLocation){
            let assigned = JSON.parse(JSON.stringify(state.species));
            assigned.forEach(item => {
                item['distance'] = getters.calculateDistance(item.location[0], currentLocation);
            });
            return JSON.parse(JSON.stringify(assigned)).sort((a, b) => {
                return a.distance - b.distance;
            });
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

    async ResetSpecies({ commit }){
        commit("setSpecies", null);
    },
};
const mutations = {
    setSpecies(state, species) {
        state.species = species;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
