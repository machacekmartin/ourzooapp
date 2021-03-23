<template>
    <button type="button" class="button" :class="[type ? 'button--' + type : '', mouseDown ? 'button--active' : '']" @click="emitClick()" @mouseover="mouseDown = true" @mouseout="mouseDown = false">
        <span v-if="text">{{ text }}</span>
        <icon :icon="icon"></icon>
    </button>
</template>
<script>
    export default {
        props: ['icon', 'type', 'text'],
        data(){
            return {
                mouseDown: false
            }
        },
        methods: {
            emitClick(){
                this.$emit('clicked');
            }
        }
    };

</script>
