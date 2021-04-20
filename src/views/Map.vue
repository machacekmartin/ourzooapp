<template >
    <div class="page" style="overflow: hidden" v-if="zoo">
        <heading type="single"></heading>
        <div class="map">
            <l-map ref="map" :options="{ zoomControl: false}" :bounds="zoo.location && zoo.location.length > 1 ? zoo.location : maxBounds">
                <l-tile-layer :url="tiles" :options="{ maxZoom: 20}"></l-tile-layer>
                <l-routing-machine @updateStats="updateStats" v-if="routerActive" :waypoints="waypoints" :router="router" :create-marker="() => {return null;}" :line-options="lineOptions" :fitSelectedRoutes="false"></l-routing-machine>
                
                <div v-for="item in currentFilterGroup" :key="item._id" v-if="item.location && item.location.length">
                    <template v-if="shouldBePolygon(item.location)">
                        <l-polygon :lat-lngs="item.location" color="green" fillColor="green" :opacity="0.1" :weight="3"></l-polygon>
                        <l-marker :lat-lng="getCenterOfPolygon(item.location)" @click="activateSlider(item)">
                            <l-icon :icon-size="[50, 42]" :icon-anchor="[25, 42]" :class-name="'map__marker map__marker--' + activeGroup">
                                <div class="map__icon">
                                    <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" :alt="item.name">
                                </div>
                            </l-icon>
                        </l-marker>
                    </template>
                    <l-marker v-else :lat-lng="item.location[0]" @click="activateSlider(item)">
                        <l-icon :icon-size="[50, 42]" :icon-anchor="[25, 42]" :class-name="'map__marker map__marker--' + activeGroup">
                            <div class="map__icon" :class="'map__icon--' + activeGroup">
                                <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" :alt="item.name">
                            </div>
                        </l-icon>
                    </l-marker>
                </div>

                <l-marker v-if="location" :lat-lng="location" ref="user">
                    <l-icon :icon-size="[24,24]" :icon-anchor="[12,12]" class-name="map__user-marker">
                        <div class="map__user-icon"></div>
                    </l-icon>
                </l-marker>
            </l-map>

            <div class="map__filters">
                <custom-button class="map__button" :class="activeGroup == filter ? 'map__button--active' : ''" v-for="filter in filters" @clicked="switchFilter(filter)" :key="filter" :icon="filter"></custom-button>
            </div>
            <custom-button class="map__locate" @clicked="focusOnZoo()" icon="location"></custom-button>
            <custom-button class="map__reset" @clicked="focusOnUser()" icon="target"></custom-button>

            <transition name="slide" mode="out-in">
                <sliding-modal v-if="sliderActive" @close="deactivateSlider()" @show="redirect()" @navigate="activateNavigation(activeDetail.location)" :text="activeDetail.description" :title="activeDetail.name" :active="sliderActive" :image="activeDetail.image" :showPage="activeGroup == 'facilities' ? false : true"></sliding-modal>
            </transition>
            <transition name="slide" mode="out-in">
                <navigation-modal v-if="routerActive" @cancel="activateSlider()" :destination="activeDetail.name" :image="activeDetail.image" :time="time" :distance="distance"></navigation-modal>
            </transition>
            
        </div>
        <transition name="fade" mode="out-in">
            <popup v-if="showPopupMsg" ref="popupmsg" agree="OK" cancel="Zpět" text="Při této akci se zruší aktuální navigace"></popup>
        </transition>
        <transition name="fade" mode="out-in">
            <popup v-if="showPopupErr" ref="popuperr" agree="OK" text="Pro přístup k interaktivní mapě musíte být uvnitř této zoo"></popup>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { latLngBounds, polyline, Routing, latLng } from 'leaflet';
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
            tiles: 'https://api.mapbox.com/styles/v1/macamp34/ckn647j0d16lj17s22aqrrgaf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFjYW1wMzQiLCJhIjoiY2tpbTBnMmJiMDhjbzJ5cHNvaHdvenZpaSJ9.hII79F6P8oxwo5xxlPybIA',
            filters: [
                'species',
                'expositions',
                'facilities'
            ],
            maxBounds: [
                latLng(51.047135697570226, 11.81109207374366),
                latLng(48.66282915025471, 18.619809934061617)
            ],
            activeGroup: 'species',
            waypoints: null,
            router: null,
            lineOptions: {
                styles: [{color: '#005343', opacity: 1, weight: 4}]
            },
            sliderActive: false,
            activeDetail: Object,
            showPopupMsg: false,
            showPopupErr: false,
        }
    },
    watch: {
        location(){
            if (this.router){
                this.waypoints = [
                    latLng(this.location.lat, this.location.lng),
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
            return this.activeDetail.time;
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
        initialLoad(){
            if (!this.location || !this.$refs.map.mapObject.getBounds().contains(this.location)){
                /*this.showPopupErr = true;
                this.$nextTick(async () => {
                const confirm = await this.$refs.popuperr.generate();
                    this.showPopupErr = false;
                    if (confirm === 1) {
                        this.$router.push('/home');
                    }
                });*/
            }  
            if (this.$route.query.type && this.$route.query.target){
                this.activeGroup = this.$route.query.type;
                const source = this.currentFilterGroup; 
                const target = source.find(item => item._id === this.$route.query.target);
                this.activateSlider(target);
            }
            
        },
        activateNavigation(destination){
            const target = polyline(destination).getBounds().getCenter();
            this.sliderActive = false;
            this.routerActive = false;

            this.$nextTick(() => {
                this.waypoints = [
                    latLng(this.location.lat, this.location.lng),
                    latLng(target.lat, target.lng)
                ];
                this.router = Routing.mapbox('pk.eyJ1IjoibWFjYW1wMzQiLCJhIjoiY2tpbTBnMmJiMDhjbzJ5cHNvaHdvenZpaSJ9.hII79F6P8oxwo5xxlPybIA', { profile:'mapbox/walking' })
                this.routerActive = true;
            });
        },
        activateSlider(item = this.activeDetail){
            if (this.routerActive){
                this.showPopupMsg = true;
                this.$nextTick(async () => {
                    const confirm = await this.$refs.popupmsg.generate();
                    this.showPopupMsg = false;
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
        focusOnUser(){
            this.$refs.map.mapObject.setView(this.location, 50);
        },
        focusOnZoo(){
            this.$refs.map.mapObject.fitBounds(this.zoo.location);
        }
    },
    async mounted(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
        await this.LoadFacilities(this.$route.params.id);

        this.$nextTick(() => {
            this.initialLoad();
        })
    }
}
</script>