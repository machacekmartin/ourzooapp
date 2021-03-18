<template>
    <div class="page margin--h">
        <h1 class="page__title">Zoo v této aplikaci</h1>
        <div class="tiles tiles--huge">
            <router-link :to="{ name: 'Zoo Home', params: { id: zoo._id } }" v-for="zoo in zoos" :key="zoo._id" class="tiles__item">
                <img :src="'https://ourzoo.eu/assets/images/medium/'+zoo.thumbnail" class="tiles__image">
                <div class="tiles__content">
                    <h2 class="tiles__title">{{ zoo.name }}</h2>
                    <small class="tiles__subtitle">{{ zoo.address }}</small>
                    <div class="tiles__details">
                        <small>{{ zoo.hours }}</small>
                        <small class="tiles__distance">64km</small>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Home',
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