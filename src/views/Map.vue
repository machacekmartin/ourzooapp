<template>
    <div class="page">
        <div class="map" v-if="zoo">
            <l-map ref="map" :zoom="zoom" :options="{ zoomControl: false}" :bounds="zoo.location" :max-bounds="zoo.location">
                <l-tile-layer :url="tiles">
                </l-tile-layer>
                <l-marker v-for="item in currentFilterGroup" :key="item._id" :lat-lng="markerLocation(item.location[0])">
                    <l-icon :icon-size="[54, 45]" :icon-anchor="[27, 45]" class-name="map__marker">
                        <div class="map__icon">
                            <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" >
                        </div>
                    </l-icon>
                </l-marker>
            </l-map>
            <div class="map__filters">
                <button class="map__filter button" :class="activeGroup == filter ? 'map__filter--active' : ''" v-for="filter in filters" @click="switchFilter(filter)">
                    <icon :icon="filter"></icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LMap, LTileLayer, LMarker, LIcon, LControl} from 'vue2-leaflet';

export default {
    name: 'Map',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LControl
    },
    data(){
        return{
            zoom: 5,
            tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            filters: [
                'species',
                'expositions',
                'facilities'
            ],
            activeGroup: 'species'
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species']),
        ...mapGetters('expositions', ['expositions']),
        ...mapGetters('facilities', ['facilities']),

        currentFilterGroup(){
            switch(this.activeGroup){
                case 'species':
                    return this.species;
                case 'expositions':
                    return this.expositions;
                case 'facilities':
                    return this.facilities;
            }
        }
    },
    methods:{
        ...mapActions('zoos', ['LoadZoo']),
        ...mapActions('species', ['LoadSpecies']),
        ...mapActions('expositions', ['LoadExpositions']),
        ...mapActions('facilities', ['LoadFacilities']),

        switchFilter(group){
            this.activeGroup = group;
        },
        markerLocation(marker){
            return [marker.lat, marker.lng];
        }
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
        await this.LoadFacilities(this.$route.params.id);
    }
}
</script>