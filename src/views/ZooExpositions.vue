<template>
    <div class="page">
        <heading type="dual" title="Expozice v naší zoo"></heading>
        <div class="page__controls margin--sm-t margin--b margin--h">
            <search-widget @update="value => search = value" placeholder="Vyhledat expozici" class="margin--sm-r"></search-widget>
            <switch-control @toggle-switch="updateSwitch" :icons="['list', 'grid']" :active="type"></switch-control>
        </div>
        <component v-if="expositions" class="margin--h" :is="type + '-widget'" :items="searchResult" link="Zoo Exposition" size="small"></component>
    </div>
</template>

<script>
import GridWidget from '@/components/widgets/Grid.vue';
import ListWidget from '@/components/widgets/List.vue';
import SearchWidget from '@/components/widgets/Search.vue';
import SwitchControl from '@/components/Switch.vue';
import Heading from '@/components/Heading.vue';
import { mapActions, mapGetters } from 'vuex';
import { filterBySearch } from '@/services/search';

export default {
    name: 'ZooExpositions',
    components: {
        GridWidget,
        ListWidget,
        SearchWidget,
        SwitchControl,
        Heading
    },
    data(){
        return {
            type: 'list',
            search: ''
        }
    },
    methods: {
        ...mapActions('expositions', ['LoadExpositions']),
        ...mapActions('zoos', ['LoadZoo']),
        updateSwitch(value){
            this.type = value;
        },  
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('expositions', ['expositions', 'expositionsSortedByDistance']),
        searchResult(){
            return filterBySearch(this.search, this.expositionsSortedByDistance);
        }
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadExpositions(this.$route.params.id);
    },
}
</script>