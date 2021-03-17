<template>
    <div class="page padding--h">
        <div class="tiles tiles--huge">
            <div v-for="zoo in zoos" class="tiles__item">
                <img :src="'http://localhost:3000/assets/images/medium/'+zoo.thumbnail" class="tiles__image">
                <div class="tiles__content">
                    <h3 class="tiles__title">{{ zoo.name }}</h3>
                    <small>{{ zoo.address }}</small>

                    <div class="tiles__details">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
    computed: {
        ...mapGetters('zoos', ['zoos'])
    },
    methods: {
        ...mapActions('zoos', ['LoadZoos']),
    },
    async created(){
        await this.LoadZoos();
    }
}
</script>