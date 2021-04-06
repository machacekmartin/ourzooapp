<template>
    <div style="display: none">
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import { Routing } from 'leaflet'
    import {
        IRouter,
        IGeocoder,
        LineOptions
    } from 'leaflet-routing-machine'
    import {
        findRealParent
    } from 'vue2-leaflet';
    let props = {
        visible: {
            type: Boolean,
            default: true
        },
        waypoints: {
            type: Array,
            required: true
        },
        router: {
            type: IRouter
        },
        plan: {
            type: Routing.Plan
        },
        geocoder: {
            type: IGeocoder
        },
        fitSelectedRoutes: {
            type: [String, Boolean],
            default: 'smart'
        },
        lineOptions: {
            type: LineOptions
        },
        routeLine: {
            type: Function
        },
        autoRoute: {
            type: Boolean,
            default: true
        },
        routeWhileDragging: {
            type: Boolean,
            default: false
        },
        routeDragInterval: {
            type: Number,
            default: 500
        },
        waypointMode: {
            type: String,
            default: 'connect'
        },
        useZoomParameter: {
            type: Boolean,
            default: false
        },
        showAlternatives: {
            type: Boolean,
            default: false
        },
        altLineOptions: {
            type: LineOptions
        },
        createMarker: {
            type: Function,
        }
    }
    // const optionTestNames = [
    //   'router',
    //   'plan',
    //   'geocoder',
    //   'lineOptions',
    //   'routeLine',
    //   'altLineOptions'
    // ]
    export default {
        props,
        name: 'LRoutingMachine',
        data() {
            return {
                parentContainer: null,
                ready: false,
                layer: null,
            }
        },

        mounted() {
            this.parentContainer = findRealParent(this.$parent);
            this.add();
            this.ready = true;
        },

        watch: {
            waypoints(){
                this.layer.setWaypoints(this.waypoints);
                //this.$emit('updateStats', this.layer)
            },
        },

        methods: {
            add() {
                if (this.parentContainer._isMounted) {
                    const {
                        waypoints,
                        router,
                        fitSelectedRoutes,
                        autoRoute,
                        routeWhileDragging,
                        routeDragInterval,
                        waypointMode,
                        useZoomParameter,
                        showAlternatives,
                        lineOptions,
                        createMarker,
                    } = this;
                    const options = {
                        waypoints,
                        router,
                        fitSelectedRoutes,
                        autoRoute,
                        routeWhileDragging,
                        routeDragInterval,
                        waypointMode,
                        useZoomParameter,
                        showAlternatives,
                        lineOptions,
                        createMarker,
                        show: false
                    };
                    const { mapObject } = this.parentContainer;
                    const routingLayer = Routing.control(options);
                    routingLayer.addTo(mapObject);
                    this.layer = routingLayer;

                    routingLayer.on('routesfound', (layer) => {
                        this.$emit('updateStats', {distance: layer.routes[0].summary.totalDistance, time: layer.routes[0].summary.totalTime});
                    })
                }
            }
        },
        beforeDestroy() {
            return this.layer ? this.layer.remove() : null;
        },
    }
</script>

<style>
    @import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
</style>