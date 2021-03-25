<template>
    <div class="page padding--h">
        <heading type="title" title="Zoo v této aplikaci"></heading>
        <div class="page__controls margin--t">
            <search-widget @update="value => search = value" placeholder="Vyhledat zoo podle názvu" class="margin--b"></search-widget>
        </div>
        <div class="tiles tiles--huge" v-if="zoos">
            <router-link :to="{ name: 'Zoo Home', params: { id: zoo._id } }" v-for="zoo in searchResult" :key="zoo._id" class="tiles__item">
                <img :src="'https://ourzoo.eu/assets/images/medium/'+zoo.thumbnail" class="tiles__image" alt="zoo">
                <div class="tiles__content">
                    <h2 class="tiles__title">{{ zoo.name }}</h2>
                    <small class="tiles__subtitle">{{ zoo.address }}</small>
                    <div class="tiles__details">
                        <small>{{ zoo.hours }}</small>
                       
                        <template v-if="zoo.distance">
                            <template v-if="zoo.distance <= 0.999">
                                <small class="tiles__distance">
                                    {{ (zoo.distance * 1000).toFixed(0) }}m
                                </small>
                            </template>
                            <template v-else-if="zoo.distance >= 10">
                                <small class="tiles__distance">
                                    {{ zoo.distance.toFixed(0) }}km
                                </small>
                            </template>
                            <template v-else>
                                <small class="tiles__distance">
                                    {{ zoo.distance.toFixed(2) }}km
                                </small>
                            </template>   
                        </template>  
                         <template v-else>
                            <small class="tiles__distance">
                                <loading></loading>
                            </small>
                        </template>    
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Heading from '@/components/Heading.vue';
import SearchWidget from '@/components/widgets/Search.vue';
import { filterBySearch } from '@/services/search';

export default {
    name: 'Home',
    components: {
        Heading,
        SearchWidget
    },  
    data(){
        return {
            search: ''
        }
    },
    computed: {
        ...mapGetters('zoos', ['zoos', 'zoosSortedByDistance']),
        searchResult(){
            return filterBySearch(this.search, this.zoosSortedByDistance);
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