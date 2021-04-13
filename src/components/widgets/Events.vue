<template>
    <div class="calendar__events" :class="size ? 'calendar__events--'+size : ''">
        <h3>{{ title }}</h3>
        <template v-if="redirect">
            <router-link  v-for="event in items" :to="{ name: 'Zoo Events', params: { id: event.zooId } }" :key="event._id" class="calendar__event" >
                <div class="calendar__basics">
                    <p class="calendar__name">{{ event.name }}</p>
                    <p class="calendar__time">{{ event.timeStart }} - {{ event.timeEnd }}</p>
                </div>
                <p class="calendar__description" v-if="activeEvent == event">
                    {{ event.description }}
                </p>
            </router-link>
        </template>
        
        <div v-else class="calendar__event" v-for="event in items" @click="activateEvent(event)" :class="activeEvent == event ? 'calendar__event--active' : ''">
            <div class="calendar__basics">
                <p class="calendar__name">{{ event.name }}</p>
                <p class="calendar__time">{{ event.timeStart }} - {{ event.timeEnd }}</p>
            </div>
            <p class="calendar__description" v-if="activeEvent == event && event.description">
                {{ event.description }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'EventsWidget',
    props: ['items', 'title', 'size', 'redirect'],
    data(){
        return {
            activeEvent: null,
        }
    },
    methods: {
        activateEvent(event){
            if (this.activeEvent == event){
                this.activeEvent = null;
            }
            else{
                this.activeEvent = event;
            }
                
        }
    },

}
</script>