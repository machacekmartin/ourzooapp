<template>
    <div class="map map--sm">
        <l-map :options="{ zoomControl: false }" :bounds="location && location.length > 1 ? location : maxBounds">
            <l-tile-layer :url="tiles"></l-tile-layer>
            </l-map>
        </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LControl, LPolygon} from 'vue2-leaflet';
import { latLngBounds, polyline } from 'leaflet';
import Heading from '@/components/Heading.vue';

export default {
    name: 'MapWidget',
    props: ['location'],
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LControl,
        Heading,
        LPolygon
    },
    data(){
        return {
            tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxBounds: latLngBounds([
                    [51.21930142931449, 11.90525934382021],
                    [48.42988280874944, 18.739304087362544]
            ]),
        }
    }
}
</script>