<template>
    <div class="horizontal-slider">
        <router-link to="/" class="horizontal-slider__panel" v-for="item in data" :key="item._id">
            <img class="horizontal-slider__image" :src="'https://ourzoo.eu/assets/images/medium/'+ item.image" :alt="item.name">
            <h4 class="horizontal-slider__content">
                <span class="horizontal-slider__text">{{ item.name }}</span>
                <span class="horizontal-slider__icon">
                    <icon icon="arrow"></icon>
                </span>
            </h4>
        </router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'HorizontalSliderWidget',
    props: ['data'],
}
</script>