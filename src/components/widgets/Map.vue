<template>
    <div class="map map--sm" v-if="location">
        <l-map :options="{ zoomControl: false }" :bounds="location.length > 1 ? location : maxBounds">
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
        }
    }
}
</script>