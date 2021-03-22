<template>
    <div class="banner">
        <img class="banner__background" src="@/static/images/map.png" alt="map">
        <div class="banner__button">
            <p class="banner__text">Zobrazit interaktivní mapu</p>
            <span class="banner__icon">
                <icon icon="location"></icon>
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'BannerWidget',
    props: ['data'],
    computed: {
        date(){
            let date = this.data.datetime.split(' ')[0];
            date = date.split('-').reverse().join('. ');
            return date;
        },
        time(){
            return this.data.datetime.split(' ')[1];
        }
    },
}
</script>