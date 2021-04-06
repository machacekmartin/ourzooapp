<template>
    <div class="sliding-modal" :class="active ? 'sliding-modal--active' : ''">
        <div class="sliding-modal__header">
            <img v-if="image" class="sliding-modal__image" :src="'https://ourzoo.eu/assets/images/large/'+ image"  alt="image">
            <custom-button @clicked="$emit('close')" icon="cross" class="sliding-modal__close"></custom-button>
        </div>
        <div class="sliding-modal__body">
            <h3>{{ title }}</h3>
            <p class="sliding-modal__text">
                {{ text }}
            </p>
            <div class="sliding-modal__buttons">
                <custom-button @clicked="$emit('navigate')" icon="locate" class="sliding-modal__button sliding-modal__button--lb"></custom-button>
                <custom-button v-if="showPage" @clicked="$emit('show')" icon="arrow" text="Zobrazit více" class="sliding-modal__button sliding-modal__button--text" type="texticon"></custom-button>            
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['active', 'image', 'title', 'text', 'group', 'showPage'],
        data(){
            return {
                
            }
        },
        methods: {
            
        }
    };

</script>
