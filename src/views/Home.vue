<template>
    <div class="page">
        <p>HELLoawdawawdawdd</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorld
    },
    data(){
        return {

        }
    },
    methods: {
        ...mapActions('zoos', ['LoadZoos']),


    },
    async created(){
        await this.LoadZoos();
    }
}
</script>