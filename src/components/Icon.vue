<template>
    <span class="icon">
        <svg class="icon__svg" width="100%" height="100%">
            <use v-bind="{'xlink:href' : require('@/static/icons/icon-set.svg')+'#icon-'+icon}" />
        </svg>
    </span>
</template>
<script>
    export default {
        props: ["icon"]
    };

</script>
