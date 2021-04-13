<template>
    <div class="timeline margin--h">
        <div class="timeline__item" @click="toggleActive(item)" :class="item.active ? 'timeline__item--active' : ''" v-for="(item, index) in sourceItems">
            <span class="timeline__point"></span>
            <div  class="timeline__datetime">
                <p class="timeline__date">{{ dateFromDatetime(item.datetime) }}.</p>
                <span class="timeline__year">{{ yearFromDatetime(item.datetime) }}</span>
            </div>
            <div class="timeline__panel">
                <h4 class="timeline__name">{{ item.name }}</h4>
                <p class="timeline__text" style="white-space: pre-line">
                    {{ item.description }}
                </p>
                <h3 class="timeline__toggle">. . .</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'TimelineWidget',
    props: ['items'],
    data(){
        return {
            sourceItems: null,
        }
    },
    watch: {
        items(){
            this.sourceItems = JSON.parse(JSON.stringify(this.items));   
            this.sourceItems.forEach(item => {
                this.$set(item, 'active', false);
            })      
        }
    },
    methods: {
        dateFromDatetime(datetime){
            let date = datetime.split(' ')[0];
            date = date.split('-');
            date.shift();

            date = date.reverse().join('. ');
            return date;
        },
        yearFromDatetime(datetime){
            return datetime.split('-')[0];
        },
        toggleActive(item){
            item.active = !item.active;
        }
    },

}
</script>