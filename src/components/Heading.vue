<template>
    <div class="heading padding--h" :class="type !== 'single' ? 'padding--t' : ''">
        <div v-if="type === 'title'" class="heading__title">
            <h1>{{ title }}</h1>
        </div>
        <div v-if="type === 'single'" class="heading__single">
            <custom-button @clicked="$router.go(-1)" class="heading__single__button heading__button" icon="back"></custom-button>
        </div>
        <div v-if="type === 'dual'" class="heading__dual">
            <custom-button @clicked="$router.go(-1)" class="heading__button" icon="back"></custom-button>
            <h1 class="heading__dual__title">{{ title }}</h1>
        </div>
        <div v-if="type === 'triple'" class="heading__triple">
            <custom-button @clicked="activateMenu()" class="heading__button" icon="menu"></custom-button>
            <h1>{{ title }}</h1>
            <custom-button @clicked="$router.push('/home')" class="heading__button" icon="panels"></custom-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Heading',
    props: ['title', 'type'],
    methods: {
        ...mapActions('menu', ['UpdateIsActive']),
        activateMenu(){
            this.UpdateIsActive(true);
        }
    },



}
</script>

