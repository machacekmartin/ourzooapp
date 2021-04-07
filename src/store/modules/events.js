import { http } from "@/services/axios";

const state = {
    events: [],
};
const getters = {
    events: state => state.events,
    todayEvents: state => {
        let today = new Date();
        today.setHours(0,0,0,0);
        return state.events.filter(event => {

            if (event.dateStart.getTime() == today.getTime())
                return true;
                
            if (event.repeat){
                if (event.dateStart < today && event.dateEnd >= today){
                    event.repeat.forEach(r => {
                        if (today.getDay() == r){
                            return true;
                        }
                    })
                }
            }
        })
    }
};
const actions = {
    async LoadEvents({ commit }, zooId) {
        let events = (
            await http.get(
                "/api/zoos/" +zooId+ "/events"
            )
        ).data;
        
        events.forEach(event => {
            let dateStart = event.dateStart.split("-");
            let dateEnd = event.dateEnd.split("-");

            event.dateStart = new Date(
                dateStart[0],
                dateStart[1] - 1,
                dateStart[2]
            ),
            event.dateEnd = new Date(dateEnd[0], dateEnd[1] - 1, dateEnd[2]);
        });

        commit("setEvents", events);
    },
};
const mutations = {
    setEvents(state, events) {
        state.events = events;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
