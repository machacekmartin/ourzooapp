<template>
    <div class="page">
        <heading type="single"></heading>
        <div class="map" v-if="zoo">
            <l-map ref="mymap" @ready="checkWhere" :options="{ zoomControl: false }" :bounds="zoo.location.length > 1 ? zoo.location : maxBounds">
                <l-tile-layer :url="tiles"></l-tile-layer>

                <l-routing-machine v-if="ready" :waypoints="waypoints" :router="router" :create-marker="() => {return null;}" :line-options="lineOptions"></l-routing-machine>

                <div v-for="item in currentFilterGroup" :key="item._id">
                    <template v-if="shouldBePolygon(item.location)">
                        <l-polygon :lat-lngs="item.location" color="green" ></l-polygon>
                        <l-marker :lat-lng="getCenterOfPolygon(item.location)" @click="activateNavigation(getCenterOfPolygon(item.location))">
                            <l-icon :icon-size="[56, 50]" :icon-anchor="[28, 50]" :class-name="'map__marker map__marker--' + activeGroup">
                                <div class="map__icon">
                                    <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" :alt="item.name">
                                </div>
                            </l-icon>
                        </l-marker>
                    </template>
                    <l-marker v-else :lat-lng="item.location[0]" @click="activateNavigation(item.location[0])">
                        <l-icon :icon-size="[56, 50]" :icon-anchor="[28, 50]" :class-name="'map__marker map__marker--' + activeGroup">
                            <div class="map__icon" :class="'map__icon--' + activeGroup">
                                <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" :alt="item.name">
                            </div>
                        </l-icon>
                    </l-marker>
                </div>
                <l-marker v-if="location" :lat-lng="location">
                    <l-icon :icon-size="[24,24]" :icon-anchor="[12,12]" class-name="map__user-marker">
                        <div class="map__user-icon"></div>
                    </l-icon>
                </l-marker>
                
            </l-map>
            <div class="map__filters">
                <custom-button class="map__filter" :class="activeGroup == filter ? 'map__filter--active' : ''" v-for="filter in filters" @clicked="switchFilter(filter)" :key="filter" :icon="filter"></custom-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { latLngBounds, polyline, Routing } from 'leaflet';
import 'leaflet-routing-machine';
import { LMap, LTileLayer, LMarker, LIcon, LControl, LPolygon} from 'vue2-leaflet';
import LRoutingMachine from '@/components/LRoutingMachine.vue'

import Heading from '@/components/Heading.vue';

export default {
    name: 'Map',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LControl,
        LPolygon,
        LRoutingMachine,
        Heading,
    },
    data(){
        return{
            ready: false,
            maxBounds: latLngBounds([
                [51.21930142931449, 11.90525934382021],
                [48.42988280874944, 18.739304087362544]
            ]),
            tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            filters: [
                'species',
                'expositions',
                'facilities'
            ],
            activeGroup: 'species',

            waypoints: null,
            router: null,
            lineOptions: {
                styles: [{color: 'black', opacity: 1, weight: 5}]
            }
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species']),
        ...mapGetters('expositions', ['expositions']),
        ...mapGetters('facilities', ['facilities']),
        ...mapGetters('location', ['location']),

        currentFilterGroup(){
            switch(this.activeGroup){
                case 'species':
                    return this.species;
                case 'expositions':
                    return this.expositions;
                case 'facilities':
                    return this.facilities;
            }
        },
    },
    methods:{
        ...mapActions('zoos', ['LoadZoo']),
        ...mapActions('species', ['LoadSpecies']),
        ...mapActions('expositions', ['LoadExpositions']),
        ...mapActions('facilities', ['LoadFacilities']),

        switchFilter(group){
            this.activeGroup = group;
        },
        shouldBePolygon(location){
            return location.length > 1;
        },
        getCenterOfPolygon(polygon){
            return polyline(polygon).getBounds().getCenter();
        },
        checkWhere(){
            if (!this.location || !this.$refs.mymap.mapObject.getBounds().contains(this.location)){
                console.log("Nejsi tam");
            }
        },
        activateNavigation(destination){
            this.ready = false;
            this.$nextTick(() => {
                this.waypoints = [
                    L.latLng(this.location.lat, this.location.lng),
                    L.latLng(destination.lat, destination.lng)
                ];
                this.router = Routing.mapbox('pk.eyJ1IjoibWFjYW1wMzQiLCJhIjoiY2tpbTFkdnA4MDhyeTJybzVkcTI5ZmpqdSJ9.HY0br03FdYsGSDQRJjx3Rw', { profile:'mapbox/walking' })
                this.ready = true;
            })
        }
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
        await this.LoadFacilities(this.$route.params.id);
    },
}
</script>