<template>
    <div id="app">
        <!--<navigation></navigation>-->
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        Navigation: Nav
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions('location', ['UpdateLocation']),
    },
    computed: {
        ...mapGetters('location', ['location'])
    },
    created(){
        document.addEventListener('deviceready', (success) => {
            navigator.geolocation.watchPosition(succ => {
                this.UpdateLocation({lat: succ.coords.latitude, lng: succ.coords.longitude});
            }, err => {}, { enableHighAccuracy: true });
        })
    }
}
</script>

<style lang="scss">
    @import 'src/styles/app.scss';
</style>