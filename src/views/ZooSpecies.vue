<template>
    <div class="page margin--h" v-if="zoo">
        <h1 class="page__title margin--t">Zvířata v naší zoo</h1>
        <grid-widget v-if="species" :items="speciesSortedByDistance" link="Zoo One Species"></grid-widget>
    </div>
</template>

<script>
import GridWidget from '@/components/widgets/Grid.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ZooSpecies',
    components: {
        GridWidget
    },
    methods: {
        ...mapActions('species', ['LoadSpecies']),
        ...mapActions('zoos', ['LoadZoo']),
    },
    computed: {
        ...mapGetters('zoos', ['zoo']),
        ...mapGetters('species', ['species', 'speciesSortedByDistance'])
    },
    async created(){
        await this.LoadZoo(this.$route.params.id);
        await this.LoadSpecies(this.$route.params.id);
    }
}
</script>