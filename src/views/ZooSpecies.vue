<template>
    <div class="page" v-if="species">
        <heading type="dual" title="Všechna zvířata v naší zoo"></heading>
        <div class="page__controls margin--sm-t margin--b margin--h">
            <search-widget @update="value => search = value" placeholder="Vyhledat zvíře" class="margin--sm-r"></search-widget>
            <switch-control @toggle-switch="updateSwitch" :icons="['list', 'grid']" :active="type"></switch-control>
        </div>
        <component class="margin--h" :is="type + '-widget'" :items="searchResult" link="Zoo One Species" size="small"></component>
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
    name: 'ZooSpecies',
    components: {
        GridWidget,
        ListWidget,
        SearchWidget,
        SwitchControl,
        Heading
    },
    data(){
        return {
            type: 'grid',
            search: ''
        }
    },
    methods: {
        ...mapActions('species', ['LoadSpecies']),
        ...mapActions('zoos', ['LoadZoo']),
        updateSwitch(value){
            this.type = value;
        },  
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species', 'speciesSortedByDistance']),
        searchResult(){
            return filterBySearch(this.search, this.speciesSortedByDistance);
        }
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
    }
}
</script>