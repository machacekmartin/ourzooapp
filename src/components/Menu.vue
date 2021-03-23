<template>
    <div class="menu" v-if="zoo">
        <div class="menu__header">
            <h1 class="menu__title">{{ zoo.name }}</h1>
            <h4 class="menu__subtitle">Our Zoo</h4>
        </div>
        <div class="menu__items">
            <router-link class="menu__item" :to="{ name: 'Zoo Species', params: { id: zoo._id } }" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon">
                    <icon icon="species"></icon>
                </span>
                <p class="menu__text">Zvířata v naší zoo</p>
            </router-link>
            <router-link class="menu__item" :to="{ name: 'Zoo Species', params: { id: zoo._id } }" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon">
                    <icon icon="expositions"></icon>
                </span>
                <p class="menu__text">Naše expozice</p>
            </router-link>
            <router-link class="menu__item" :to="{ name: 'Zoo Species', params: { id: zoo._id } }" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon">
                    <icon icon="location"></icon>
                </span>
                <p class="menu__text">Interaktivní mapa</p>
            </router-link>
            <router-link class="menu__item" :to="{ name: 'Zoo Species', params: { id: zoo._id } }" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon">
                    <icon icon="calendar"></icon>
                </span>
                <p class="menu__text">Události</p>
            </router-link>
            <router-link class="menu__item" :to="{ name: 'Zoo Species', params: { id: zoo._id } }" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon">
                    <icon icon="species"></icon>
                </span>
                <p class="menu__text">Novinky</p>
            </router-link>
        </div>

        <div class="menu__footer">
            <router-link class="menu__item" to="/home" v-on:click.native="UpdateIsActive(false)">
                <span class="menu__icon menu__icon--sm">
                    <icon icon="back"></icon>
                </span>
                <p class="menu__text">Zpět na seznam zoo</p>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('zoos', ['zoo'])
    },
    methods: {
        ...mapActions('menu', ['UpdateIsActive']),
    },
    
};

</script>
