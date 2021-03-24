<template>
    <div id="app" class="app">
        <menu-component :class="isActive ? 'menu--active' : ''"></menu-component>
        <div class="app__page" v-on="isActive ? { click: () => UpdateIsActive(false) } : {}" :class="[(isActive ? 'app__page--mini' : ''), (isOverflowHidden ? 'app__page--mini--hideoverflow' : '')]">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <p v-if="location" style="position: fixed; bottom: 0; background: black; color: white; padding: .25rem .5rem">{{ location.lat }} | {{ location.lng }}</p>
    </div>
    
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Menu from '@/components/Menu.vue';

export default {
    components: {
        MenuComponent: Menu
    },
    data() {
        return {

        }   
    },
    methods: {
        ...mapActions('location', ['UpdateLocation']),
        ...mapActions('menu', ['UpdateIsActive']),
    },
    computed: {
        ...mapGetters('location', ['location']),
        ...mapGetters('menu', ['isActive', 'isOverflowHidden']),
    },
    created(){
        document.addEventListener('deviceready', (success) => {
            navigator.geolocation.getCurrentPosition(succ => {
                this.UpdateLocation({lat: succ.coords.latitude, lng: succ.coords.longitude});
            }, err => {
                alert(err.message);
            }, { enableHighAccuracy: true, maximumAge: 1000 })

            navigator.geolocation.watchPosition(succ => {
                console.log("Hey, you moved!", succ.coords.latitude, succ.coords.longitude);
                if (succ.coords.latitude !== this.location.lat || succ.coords.longitude !== this.location.lng){
                    this.UpdateLocation({lat: succ.coords.latitude, lng: succ.coords.longitude});
                }
            }, err => {
                alert(err.message);
            }, { enableHighAccuracy: true, maximumAge: 30000 });
        })
    }
}
</script>

<style lang="scss">
    @import 'src/styles/app.scss';
</style>