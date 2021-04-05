<template>
    <div class="page" style="overflow: hidden">
        <heading type="single"></heading>
        <div class="map" v-if="zoo && species">
            <l-map ref="map" @ready="checkWhere" :options="{ zoomControl: false }" :bounds="zoo.location.length > 1 ? zoo.location : maxBounds">
                <l-tile-layer :url="tiles"></l-tile-layer>
                <l-routing-machine @updateStats="updateStats" v-if="routerActive" :waypoints="waypoints" :router="router" :create-marker="() => {return null;}" :line-options="lineOptions"></l-routing-machine>
                
                <div v-for="item in currentFilterGroup" :key="item._id">
                    <template v-if="shouldBePolygon(item.location)">
                        <l-polygon :lat-lngs="item.location" color="green" ></l-polygon>
                        <l-marker :lat-lng="getCenterOfPolygon(item.location)" @click="activateSlider(item)">
                            <l-icon :icon-size="[56, 50]" :icon-anchor="[28, 50]" :class-name="'map__marker map__marker--' + activeGroup">
                                <div class="map__icon">
                                    <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" :alt="item.name">
                                </div>
                            </l-icon>
                        </l-marker>
                    </template>
                    <l-marker v-else :lat-lng="item.location[0]" @click="activateSlider(item)">
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
            <transition name="slide" mode="out-in">
                <sliding-modal v-if="sliderActive" @close="deactivateSlider()" @show="redirect()" @navigate="activateNavigation(activeDetail.location[0])" :text="activeDetail.description" :title="activeDetail.name" :active="sliderActive" :image="activeDetail.image" :showPage="activeGroup == 'facilities' ? false : true"></sliding-modal>
            </transition>
            <transition name="slide" mode="out-in">
                <navigation-modal v-if="routerActive" @cancel="activateSlider()" :destination="activeDetail.name" :image="activeDetail.image" :time="time" :distance="distance"></navigation-modal>
            </transition>
        </div>
        <transition name="fade" mode="out-in">
            <popup v-if="showPopup" ref="popup" agree="OK" cancel="Zpět" text="Při této akci se zruší aktuální navigace"></popup>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { latLngBounds, polyline, Routing } from 'leaflet';
import 'leaflet-routing-machine';
import { LMap, LTileLayer, LMarker, LIcon, LControl, LPolygon} from 'vue2-leaflet';
import LRoutingMachine from '@/components/LRoutingMachine.vue'

import Heading from '@/components/Heading.vue';
import SlidingModal from '@/components/SlidingModal.vue';
import NavigationModal from '@/components/NavigationModal.vue';

import Popup from '@/components/Popup.vue';

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
        SlidingModal,
        NavigationModal,
        Popup
    },
    data(){
        return{
            routerActive: false,
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
            },
            sliderActive: false,
            activeDetail: Object,
            showPopup: false
        }
    },
    watch: {
        location(){
            if (this.router){
                this.waypoints = [
                    L.latLng(this.location.lat, this.location.lng),
                    this.waypoints[1]
                ];
            }
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species']),
        ...mapGetters('expositions', ['expositions']),
        ...mapGetters('facilities', ['facilities']),
        ...mapGetters('location', ['location']),

        distance(){
            return this.activeDetail.distance;
        },
        time(){
            return this.activeDetail.time
        },
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

        redirect(){
            switch(this.activeGroup){
                case 'species':
                    this.$router.push({ name: 'Zoo One Species', params: { id: this.zoo._id, detailId: this.activeDetail._id } });
                    break;
                case 'expositions':
                    this.$router.push({ name: 'Zoo Exposition', params: { id: this.zoo._id, detailId: this.activeDetail._id } });
                    break;
            };
        },

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
            if (!this.location || !this.$refs.map.mapObject.getBounds().contains(this.location)){
                console.log("Nejsi tam");
            }
        },
        activateNavigation(destination){
            this.sliderActive = false;
            this.routerActive = false;

            this.$nextTick(() => {
                this.waypoints = [
                    L.latLng(this.location.lat, this.location.lng),
                    L.latLng(destination.lat, destination.lng)
                ];
                this.router = Routing.mapbox('pk.eyJ1IjoibWFjYW1wMzQiLCJhIjoiY2tpbTFkdnA4MDhyeTJybzVkcTI5ZmpqdSJ9.HY0br03FdYsGSDQRJjx3Rw', { profile:'mapbox/walking' })
                this.routerActive = true;
            });
        },
        activateSlider(item = this.activeDetail){
            if (this.routerActive){
                this.showPopup = true;
                this.showPopup = true;
                this.$nextTick(async () => {
                    const confirm = await this.$refs.popup.generate();
                    this.showPopup = false;
                    if (confirm === 1) {
                        this.routerActive = false;
                        this.sliderActive = true;
                        this.activeDetail = item;
                    }
                });
            }
            else{
                this.sliderActive = true;
                this.activeDetail = item;
                this.$refs.map.mapObject.setZoomAround(polyline(item.location).getBounds().getCenter(), 30);
            }
        },
        deactivateSlider(){
            this.sliderActive = false;
            this.$refs.map.mapObject.setZoom(this.$refs.map.mapObject.getZoom() - 1);
        },
        updateStats(stats){
            this.$set(this.activeDetail, 'time', stats.time);
            this.$set(this.activeDetail, 'distance', stats.distance);
        },
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
        await this.LoadFacilities(this.$route.params.id);
    },
}
</script>