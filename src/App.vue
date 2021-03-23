<template>
    <div id="app" class="app">
        <menu-component :class="isActive ? 'menu--active' : ''"></menu-component>
        <div class="app__page" v-on="isActive ? { click: () => UpdateIsActive(false) } : {}" :class="[(isActive ? 'app__page--mini' : ''), (isOverflowHidden ? 'app__page--mini--hideoverflow' : '')]">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
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