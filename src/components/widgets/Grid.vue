<template>
    <div class="grid">
        <router-link :to="{ name: link, params: { id: item.zooId, detailId: item._id } }" class="grid__item" v-for="item in items">
            <img class="grid__image" :src="'https://ourzoo.eu/assets/images/small/'+ item.image">
            <p class="grid__text">{{ item.name }}</p>
        </router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'GridWidget',
    props: ['items', 'link'],
}
</script>