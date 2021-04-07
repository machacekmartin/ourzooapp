<template>
    <div class="calendar" v-if="ready">

        <div class="calendar__grid">
            <span class="calendar__header" v-for="weekDay in weekDays">
                {{ weekDay }}
            </span>
            <div class="calendar__item" v-on="day ? { click: () => selectDay(day)}: '' " v-for="(day, index) in days" :class="[isSame(day) ? 'calendar__item--active' : '', day ? '' : 'calendar__item--disabled']">
                <template v-if="day"> 
                    <span class="calendar__text">{{ day.date.getDate() }}</span>
                    <div class="calendar__dot" v-if="day.events.length"></div>
                </template> 
            </div>
        </div>
        <div class="calendar__controls">
            <custom-button class="calendar__button" @clicked="setDate(date.getMonth())" icon="back"></custom-button>
            <h4 class="calendar__text">{{ date.getMonth() + 1 }}. {{ date.getFullYear() }}</h4>
            <custom-button class="calendar__button" @clicked="setDate(date.getMonth() + 2)" icon="next"></custom-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'GridWidget',
    props: ['items'],
    data(){
        return {
            date: null,
            filteredEvents: [],
            firstDay: null,
            lastDay: null,
            days: null,
            startOffset: null,
            endOffset: null,
            selectedDay: null,

            ready: false,

            weekDays: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"]
        }
    },
    watch: {
        date() {
            this.initCalendar();
            this.filterEvents();
            this.assignEvents();
            this.selectedDay = this.days.find(day => JSON.stringify(day.date) == JSON.stringify(this.date));
            this.fillOffsets();
        },
        selectedDay(){
            this.$emit('selected', this.selectedDay.events);
        }
    },
    methods: {
        isSame(day){
            if (day){
                return JSON.stringify(this.selectedDay.date) == JSON.stringify(day.date)
            }
            return false
        },
        selectDay(day){
            this.selectedDay = day;

        },
        
        initCalendar(){
            this.firstDay = new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                1
            );
            this.lastDay = new Date(
                this.date.getFullYear(),
                this.date.getMonth() + 1,
                0
            );

            this.startOffset =  Math.abs(this.firstDay.getDay() == 0 ? 6 : this.firstDay.getDay() - 1);
            this.endOffset = this.lastDay.getDay() == 0 ? 0 : Math.abs(this.lastDay.getDay() - 7);

            let numberOfDays = this.lastDay.getDate();

            this.days = [...Array(numberOfDays)].map((_, index) => {
                return {
                    date: new Date(
                        this.date.getFullYear(),
                        this.date.getMonth(),
                        index + 1
                    ),
                    events: []
                };
            });
        },
        filterEvents() {
            this.filteredEvents = this.items.filter(event => {
                if (event.dateStart <= this.lastDay &&
                    event.dateEnd >= this.firstDay)
                {
                    return true;
                }
            });
        },
        fillOffsets() {
            for (let i = 0; i < this.startOffset; i++) {
                this.days.unshift(null);
            }
            for (let i = 0; i < this.endOffset; i++) {
                this.days.push(null);
            }
        },
        assignEvents(){
            this.filteredEvents.forEach(event => {
                let targetDay = this.days.find(day => day.date.getTime() == event.dateStart.getTime());
                targetDay.events.push(event);

                event.repeat.forEach(r => {
                    this.days.filter(day => {
                        if (day.date.getTime() <= event.dateEnd.getTime() &&
                            day.date.getTime() >= event.dateStart.getTime())
                        {
                            return true;
                        }
                    }).forEach(day => {
                        if (day.date.getDay() == r) {
                            if (!day.events.includes(event)) {
                                day.events.push(event);
                            }
                        }
                    });
                });
            });
        },
        resetDate() {
            this.date = new Date();
            this.date.setHours(0,0,0,0);
        },
        setDate(newMonth){
            this.date = new Date(this.date.getFullYear(), newMonth, 0);
            this.date.setHours(0,0,0,0);
        }
    },

    mounted(){
        this.resetDate();
        this.ready = true;
    }
}
</script>