<template>
    <div class="page margin--h" v-if="species">
        <h1 class="page__title margin--t">Zvířata v naší zoo</h1>
        <div class="page__controls margin--t margin--b">
            <label class="input margin--sm-r">
                <span class="input__icon">
                    <icon icon="search"></icon>
                </span>
                <input :value="searchValue" @input='evt => searchValue = evt.target.value' class="input__text margin--sm-l" type="text" placeholder="Vyhledat zvíře">
            </label>
            <switch-control @toggle-switch="updateSwitch" :icons="['list', 'grid']" :active="type"></switch-control>
        </div>
        <component :is="type + '-widget'" :items="searchResult" link="Zoo One Species" size="small"></component>
    </div>
</template>

<script>
import GridWidget from '@/components/widgets/Grid.vue';
import ListWidget from '@/components/widgets/List.vue';
import SwitchControl from '@/components/Switch.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ZooSpecies',
    components: {
        GridWidget,
        ListWidget,
        SwitchControl
    },
    data(){
        return {
            type: 'grid',
            searchValue: '',
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
            if (this.searchValue) {
                return this.speciesSortedByDistance.filter(one => {
                    return this.searchValue.toLowerCase().split(" ").every(word => {
                        return (one.name.toLowerCase().includes(word))
                    })
                })
            } 
            else {
                return this.speciesSortedByDistance
            }
        }
        
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
    }
}
</script>