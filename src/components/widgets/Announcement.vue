<template>
    <div class="announcement tablet padding--h">
        <h3 class="tablet__title">{{ data.name }}</h3>
        <div class="tablet__content">
            <div class="tablet__text">
                <p class="tablet__description">{{ data.description }}</p>
                <p class="tablet__datetime">
                <span>{{ date }} {{ time }}</span> 
                </p>
            </div>
            <router-link to="Intro" class="tablet__button button">
                <icon icon="announcements"></icon>
            </router-link>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'AnnouncementWidget',
    props: ['data'],
    data(){
        return{

        }
    },
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
    methods: {
    },

    async created(){

    }
}
</script>