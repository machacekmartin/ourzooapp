<template>
    <div class="page">
        <div class="map">
            <l-map :center="center" :zoom="zoom">
                <l-tile-layer :url="tiles">
                
                </l-tile-layer>
            </l-map>
        </div>
    </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
    name: 'Map',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data(){
        return{
            center: latLng(47.41322, -1.219482),
            zoom: 12,
            tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        }
    }
}
</script>