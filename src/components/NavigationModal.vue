<template>
    <div class="navigation-modal" :class="[active ? 'navigation-modal--active' : '', target ? 'navigation-modal--audio-active' : '']" >
        <img class="navigation-modal__image" :src="'https://ourzoo.eu/assets/images/small/'+ image"  alt="image">
        <div class="navigation-modal__detail">
            <h4 class="navigation-modal__title">{{ destination }}</h4>
            <div class="navigation-modal__stats"v-if="time && distance">
                <div class="navigation-modal__stat">
                    <span class="navigation-modal__stat__name">čas do cíle</span>
                    <p>~<strong>{{ (time / 60).toFixed(2) }}</strong> min</p>
                </div>
                <span class="navigation-modal__divider"></span>
                <div class="navigation-modal__stat">
                    <span  class="navigation-modal__stat__name">vzdálenost</span>
                    <p><strong>{{ distance.toFixed(1) }}</strong> m</p>
                </div>
            </div>
        </div>
        <custom-button @clicked="$emit('cancel')" icon="cross" class="navigation-modal__close"></custom-button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
    export default {
        props: ['active', 'image', 'destination', 'time', 'distance'],
        data(){
            return {
                
            }
        },
        computed: {
            ...mapGetters('audio', ['target'])
        }
    };
</script>
