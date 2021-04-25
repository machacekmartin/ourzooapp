<template>
    <button type="button" class="button" :class="[type ? 'button--' + type : '', touching ? 'button--active' : '']" @click="emitClick()">
        <span v-if="text">{{ text }}</span>
        <icon :icon="icon"></icon>
    </button>
</template>
<script>
    export default {
        props: ['icon', 'type', 'text'],
        data(){
            return {
                touching: false
            }
        },
        methods: {
            emitClick(event){
                this.$emit('clicked');
            },
        }
    };

</script>
