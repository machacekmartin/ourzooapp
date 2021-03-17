<template>
    <div class="page" v-if="zoo">
        <router-link to="/home">awdawd</router-link>
        <h1>{{ zoo.name }}</h1>
        <div class="padding--h">
            <announcement-widget v-if="latestAnnouncement" :data="latestAnnouncement"> </announcement-widget>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AnnouncementWidget from '@/components/widgets/Announcement.vue';
export default {
    name: 'ZooHome',
    components: {
        AnnouncementWidget
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('announcements', ['latestAnnouncement']),
    },
    methods: {
        ...mapActions('zoos', ['LoadZoo', 'ResetZoo']),
        ...mapActions('announcements', ['LoadLatestAnnouncement', 'ResetLatestAnnouncement']),
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadLatestAnnouncement(this.$route.params.id);
    },
    beforeDestroy(){
        this.ResetZoo();
        this.ResetLatestAnnouncement();
    }
}
</script>