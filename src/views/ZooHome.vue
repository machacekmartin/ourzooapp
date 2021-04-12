<template>
    <div class="page margin--b" v-if="zoo">
        <heading type="triple" :title="zoo.name" ></heading>
        <div class="widget margin--t margin--h">
            <div class="widget__header margin--sm-b">
                <h3>Nejnovější oznámení</h3>
            </div>
            <tablet-widget v-if="latestAnnouncement" :data="latestAnnouncement" link="Zoo Announcements"></tablet-widget>
        </div>
        <div class="widget margin--t">
            <div class="widget__header margin--h margin--sm-b">
                <h3>Nejbližší zvířata v této zoo</h3>
            </div>
            <horizontal-slider-widget v-if="limitedSpecies" :data="limitedSpecies" link="Zoo One Species"></horizontal-slider-widget>
        </div>
        <router-link :to="{ name: 'Zoo Species', params: { id: zoo._id } }" class="text-link margin--t">
            <h3>Všechna zvířata</h3>
        </router-link>
        
        <router-link :to="{ name: 'Zoo Map', params: { id: zoo._id } }" class="widget margin--h margin--t">
            <banner-widget></banner-widget>
        </router-link>

        <div class="widget margin--t margin--h">
            <div class="widget__header margin--sm-b">
                <h3>Nejbližší expozice</h3>
            </div>
            <list-widget v-if="limitedExpositions" :items="limitedExpositions" link="Zoo Exposition"></list-widget>
        </div>
        <router-link :to="{ name: 'Zoo Expositions', params: { id: zoo._id } }" class="text-link margin--sm-t">
            <h3>Všechny expozice</h3>
        </router-link>
        <events-widget class="margin--t padding--h padding--lg-b" v-if="events && todayEvents.length && currentDate" title="Plán na dnešní den" :items="todayEvents" size="small" :redirect="true"></events-widget>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TabletWidget from '@/components/widgets/Tablet.vue';
import HorizontalSliderWidget from '@/components/widgets/HorizontalSlider.vue';
import BannerWidget from '@/components/widgets/Banner.vue';
import ListWidget from '@/components/widgets/List.vue';
import EventsWidget from '@/components/widgets/Events.vue';
import Heading from '@/components/Heading.vue';

export default {
    name: 'ZooHome',
    components: {
        TabletWidget,
        HorizontalSliderWidget,
        BannerWidget,
        ListWidget,
        EventsWidget,
        Heading
    },
    data(){
        return{
            currentLocation: null,
            currentDate: (new Date()).setHours(0,0,0,0)
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('announcements', ['latestAnnouncement']),
        ...mapGetters('species', ['species', 'speciesSortedByDistance']),
        ...mapGetters('expositions', ['expositions', 'expositionsSortedByDistance']),
        ...mapGetters('events', ['events', 'todayEvents']),
        ...mapGetters('location', ['location']),

        limitedSpecies(){
            return this.speciesSortedByDistance.slice(0, 5);
        },
        limitedExpositions(){
            return this.expositionsSortedByDistance.slice(0,5);
        },
    },
    methods: {
        ...mapActions('zoos', ['LoadZoo', 'ResetZoo']),
        ...mapActions('announcements', ['LoadLatestAnnouncement', 'ResetLatestAnnouncement']),
        ...mapActions('species', ['LoadSpecies', 'ResetSpecies']),
        ...mapActions('expositions', ['LoadExpositions', 'ResetExpositions']),
        ...mapActions('events', ['LoadEvents']),
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadLatestAnnouncement(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
        await this.LoadEvents(this.$route.params.id);
    },
    beforeDestroy(){
        this.ResetZoo();
        this.ResetLatestAnnouncement();
        this.ResetSpecies();
        this.ResetExpositions();
    }
}
</script>