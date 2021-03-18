<template>
    <div class="page">
        <div class="map" v-if="zoo">
            <l-map :zoom="zoom" :bounds="zoo.location" :max-bounds="zoo.location">
                <l-tile-layer :url="tiles">
                
                </l-tile-layer>
                <l-marker v-for="item in species" :key="item._id" :lat-lng="markerLocation(item.location[0])">
                    <l-icon :icon-size="[54, 45]" :icon-anchor="[27, 45]" class-name="map__marker">
                        <div class="map__icon">
                            <img class="map__image" :src="'https://ourzoo.eu/assets/images/tiny/'+ item.image" >
                        </div>
                    </l-icon>
                </l-marker>
            </l-map>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';

export default {
    name: 'Map',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
    },
    data(){
        return{
            zoom: 5,
            tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species']),
    },
    methods:{
        ...mapActions('zoos', ['LoadZoo']),
        ...mapActions('species', ['LoadSpecies']),
        markerLocation(marker){
            return [marker.lat, marker.lng];
        }
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
    }
}
</script>