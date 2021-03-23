<template>
    <div class="announcement tablet" v-if="data">
        <h3 class="tablet__title">{{ data.name }}</h3>
        <div class="tablet__content">
            <div class="tablet__text">
                <p class="tablet__description">{{ data.description }}</p>
                <p class="tablet__datetime">
                <span>{{ date }} {{ time }}</span> 
                </p>
            </div>
            <custom-button @clicked="$router.push('/intro')" class="tablet__button" icon="announcements"></custom-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'TabletWidget',
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