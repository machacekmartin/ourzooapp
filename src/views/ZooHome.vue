<template>
    <div class="page margin--b" v-if="zoo">
        <router-link to="/home">awdawd</router-link>
        <h1>{{ zoo.name }}</h1>
        <div class="widget margin--t margin--h">
            <div class="widget__header margin--sm-b">
                <h3>Nejnovější oznámení</h3>
            </div>
            <tablet-widget v-if="latestAnnouncement" :data="latestAnnouncement"></tablet-widget>
        </div>
        <div class="widget margin--t">
            <div class="widget__header margin--h margin--sm-b">
                <h3>Nejbližší zvířata v této zoo</h3>
            </div>
            <horizontal-slider-widget v-if="species" :data="limitedSpecies"></horizontal-slider-widget>
        </div>
        <router-link to="/" class="text-link margin--t">
            <h3>Všechna zvířata</h3>
        </router-link>
        
        <router-link :to="{ name: 'Zoo Map', params: { id: zoo._id } }" class="widget margin--h margin--t">
            <banner-widget></banner-widget>
        </router-link>

        <div class="widget margin--t margin--h">
            <div class="widget__header margin--sm-b">
                <h3>Nejbližší expozice</h3>
            </div>
            <list-widget :items="expositions"></list-widget>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TabletWidget from '@/components/widgets/Tablet.vue';
import HorizontalSliderWidget from '@/components/widgets/HorizontalSlider.vue';
import BannerWidget from '@/components/widgets/Banner.vue';
import ListWidget from '@/components/widgets/List.vue';

export default {
    name: 'ZooHome',
    components: {
        TabletWidget,
        HorizontalSliderWidget,
        BannerWidget,
        ListWidget
    },
    data(){
        return{
            currentLocation: null,
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('announcements', ['latestAnnouncement']),
        ...mapGetters('species', ['species', 'speciesWithDistance']),
        ...mapGetters('expositions', ['expositions']),
        ...mapGetters('location', ['location']),

        limitedSpecies(){
            if (this.location){
                return this.speciesWithDistance;
            }
            return this.species;
        }
    },
    methods: {
        ...mapActions('zoos', ['LoadZoo', 'ResetZoo']),
        ...mapActions('announcements', ['LoadLatestAnnouncement', 'ResetLatestAnnouncement']),
        ...mapActions('species', ['LoadSpecies', 'ResetSpecies']),
        ...mapActions('expositions', ['LoadExpositions', 'ResetExpositions']),
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadLatestAnnouncement(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
    },
    beforeDestroy(){
        this.ResetZoo();
        this.ResetLatestAnnouncement();
        this.ResetSpecies();
        this.ResetExpositions();
    }
}
</script>