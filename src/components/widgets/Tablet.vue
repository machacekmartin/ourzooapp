<template>
    <router-link class="announcement tablet" v-if="data" :to="{ name: link, params: { id: zoo._id } }">
        <h4 class="tablet__title">{{ data.name }}</h4>
        <div class="tablet__content">
            <div class="tablet__text">
                <p class="tablet__description">{{ data.description }}</p>
                <p class="tablet__datetime">
                <span>{{ date }} {{ time }}</span> 
                </p>
            </div>
            <custom-button class="tablet__button" icon="announcements"></custom-button>
        </div>
    </router-link>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'TabletWidget',
    props: ['data', 'link'],
    computed: {
        ...mapGetters('zoos', ['zoo']),
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