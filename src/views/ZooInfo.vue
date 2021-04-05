<template>
    <div class="page margin--b" v-if="zoo">
        <heading type="single"></heading>
        <div class="page__header">
            <img class="page__background page__background--static" :src="'https://ourzoo.eu/assets/images/medium/'+ zoo.logo">
        </div>
        <div class="page__body padding--h padding--lg-t padding--b">
            <h1 class="page__title">{{ zoo.name }}</h1>
            <div class="page__details page__details--rows">
                <div class="page__detail">
                    <span class="page__detail__icon">
                        <icon icon="species"></icon>
                    </span>
                    <h4>Telefon: <span class="page__detail__small">{{ zoo.phone }}</span></h4> 
                </div>
                <div class="page__detail">
                    <span class="page__detail__icon">
                        <icon icon="species"></icon>
                    </span>
                    <h4>Email: <a class="page__detail__small page__detail__link" :href="'mailto:'+zoo.email">{{ zoo.email }}</a></h4> 
                </div>
                <div class="page__detail">
                    <span class="page__detail__icon">
                        <icon icon="species"></icon>
                    </span>
                    <h4>Adresa: <a :href="'https://maps.google.com/?q='+zoo.address" target="__blank" class="page__detail__small page__detail__link">{{ zoo.address }}</a></h4> 
                </div>
                <div class="page__detail">
                    <span class="page__detail__icon">
                        <icon icon="species"></icon>
                    </span>
                    <h4>Web: <a :href="zoo.url" target="__blank" class="page__detail__small page__detail__link" >{{ zoo.url }}</a></h4> 
                </div>
                <div class="page__detail">
                    <span class="page__detail__icon">
                        <icon icon="species"></icon>
                    </span>
                    <h4>Otevírací doba: <span class="page__detail__small">{{ zoo.hours }}</span></h4> 
                </div>
            </div>    
        </div>

    <div class="widget margin--t padding--h padding--lg-b" v-if="zoo && zoo.location">
        <div class="widget__header margin--sm-b">
            <h3>Mapa zoo</h3>
        </div>
        <map-widget :location="zoo.location"></map-widget>
    </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Heading from '@/components/Heading.vue';
import MapWidget from '@/components/widgets/Map.vue';

export default {
    name: 'ZooInfo',
    components: {
        Heading,
        MapWidget
    },
    data(){
        return{
            currentLocation: null,
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
    },
    methods: {
        ...mapActions('zoos', ['LoadZoo', 'ResetZoo']),

    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
    },
    beforeDestroy(){
        this.ResetZoo();
    }
}
</script>