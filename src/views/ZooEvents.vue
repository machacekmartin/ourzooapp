<template>
    <div class="page">
        <heading type="dual" title="Kalendář událostí"></heading>
        <div class="page__body page__body--normal padding--h padding--b">
            <calendar-widget class="margin--t" v-if="events.length" :items="events" @selected="(e) => {currentEvents = e}"></calendar-widget>
        </div>
        <events-widget class="padding--h margin--t" :items="currentEvents" title="Plán na vybraný den" :redirect="false"></events-widget>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Heading from '@/components/Heading.vue';
import CalendarWidget from '@/components/widgets/Calendar.vue';
import EventsWidget from '@/components/widgets/Events.vue';
export default {
    name: 'ZooEvents',
    components: {
        Heading,
        CalendarWidget,
        EventsWidget
    },  
    data(){
        return {
            currentEvents: null
        }
    },
    methods: {
        ...mapActions('zoos', ['LoadZoo']), 
        ...mapActions('events', ['LoadEvents']), 
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('events', ['events']),
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadEvents(this.$route.params.id);
    }
}
</script>