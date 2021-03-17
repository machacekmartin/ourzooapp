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

export default {
    components: {
        Navigation: Nav
    },
    data() {
        return {
            ready: false,
        }
    }
}
</script>

<style lang="scss">
    @import 'src/styles/app.scss';
</style>