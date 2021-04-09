<template>
    <div id="app" class="app" :class="isActive ? 'app--menu-active' : ''">
        <menu-component :class="isActive ? 'menu--active' : ''"></menu-component>
        <div class="app__page" v-on="isActive ? { click: () => UpdateIsActive(false) } : {}" :class="[(isActive ? 'app__page--mini' : ''), (isOverflowHidden ? 'app__page--mini--hideoverflow' : '')]">
            <transition name="fade" mode="out-in">
                <router-view :class="target && $route.name !== 'Zoo Map' ? 'padding--xxl-b' : ''" />
            </transition>
            <transition name="slide" mode="out-in">
                <audio-player v-if="target"></audio-player>
            </transition>
        </div>
    </div>
    
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Menu from '@/components/Menu.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default {
    components: {
        MenuComponent: Menu,
        AudioPlayer
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
        ...mapGetters('audio', ['target'])
    },
    created(){
        document.addEventListener('deviceready', (success) => {
            navigator.geolocation.getCurrentPosition(succ => {
                this.UpdateLocation({lat: succ.coords.latitude, lng: succ.coords.longitude})

                navigator.geolocation.watchPosition(succ => {
                    if (succ.coords.latitude !== this.location.lat || succ.coords.longitude !== this.location.lng){
                        this.UpdateLocation({lat: succ.coords.latitude, lng: succ.coords.longitude});
                    }
                }, err => {
                alert(err.message);
                }, { enableHighAccuracy: true, maximumAge: 30000 });
                
            }, err => {
                alert(err.message);
            }, { enableHighAccuracy: true })

            
        })
    }
}
</script>

<style lang="scss">
    @import 'src/styles/app.scss';
</style>