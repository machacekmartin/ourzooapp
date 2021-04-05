<template>
    <div class="popup">
        <div class="popup__window">
            <div class="popup__text">
                <h4>{{ text }}</h4>
            </div>
            <div class="popup__controls">
                <custom-button v-if="agree" class="popup__button button--lgreen" type="textinfo" @clicked="emitClick(1)" :text="agree"></custom-button>
                <custom-button v-if="cancel" class="popup__button button--red" type="textinfo" @clicked="emitClick(0)" :text="cancel"></custom-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@/components/Icon.vue";
    export default {
        props: ['text', 'agree', 'cancel'],
        components: {
            Icon
        },
        data() {
            return {
                resolve: null
            };
        },
        methods: {
            async generate() {
                return new Promise(resolve => {
                    this.resolve = resolve;
                });
            },
            emitClick(value) {
                this.resolve && this.resolve(value);
            }
        }
    };

</script>
