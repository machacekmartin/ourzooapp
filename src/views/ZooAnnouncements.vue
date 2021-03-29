<template>
    <div class="page">
        <heading type="dual" title="Archiv oznámení"></heading>
        <timeline-widget v-if="announcements" :items="announcements"></timeline-widget>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Heading from '@/components/Heading.vue';
import TimelineWidget from '@/components/widgets/Timeline.vue';
export default {
    name: 'ZooAnnouncements',
    components: {
        Heading,
        TimelineWidget
    },  
    methods: {
        ...mapActions('zoos', ['LoadZoo']), 
        ...mapActions('announcements', ['LoadAnnouncements']), 
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('announcements', ['announcements']),
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadAnnouncements(this.$route.params.id);
    }
}
</script>