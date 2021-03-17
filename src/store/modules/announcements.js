import { http } from "@/services/axios";

const state = {
    announcements: [],
    latestAnnouncement: null,
};
const getters = {
    announcements: state => state.announcements,
    latestAnnouncement: state => state.latestAnnouncement
};
const actions = {

    async LoadLatestAnnouncement({ commit }, zooId) {
        const latestAnnouncement = (
            await http.get("/api/zoos/" +zooId+ "/announcements/latest")
        ).data;
        commit("setLatestAnnouncement", latestAnnouncement);
    },

    async LoadAnnouncements({ commit }, zooId) {
        const announcements = (
            await http.get(
                "/api/zoos/" +zooId+ "/announcements"
            )
        ).data;
        commit("setAnnouncements", announcements);
    },

    async ResetLatestAnnouncement({ commit }){
        commit("setLatestAnnouncement", null);
    }
};
const mutations = {
    setAnnouncements(state, announcements) {
        state.announcements = announcements;
    },
    setLatestAnnouncement(state, latestAnnouncement) {
        state.latestAnnouncement = latestAnnouncement;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
