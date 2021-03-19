<template>
    <div class="list">
        <router-link to="/" class="list__item" v-for="item in items">
            <img class="list__image" :src="'https://ourzoo.eu/assets/images/small/'+ item.image">
            <div class="list__content">
                <h4>{{ item.name }}</h4>
                <p class="list__text">{{ item.description }}</p>
            </div>
            <span class="list__button">
                <icon icon="arrow"></icon>
            </span>
        </router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'ListWidget',
    props: ['items'],
}
</script>