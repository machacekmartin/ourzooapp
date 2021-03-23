<template>
    <div class="switch">
        <span @click="toggleSwitch(icons[0])" class="switch__icon" :class="active === icons[0] ? 'active' : ''" data-switch="0">
            <icon :icon="icons[0]"></icon>
        </span>
        <span @click="toggleSwitch(icons[1])" class="switch__icon" :class="active === icons[1] ? 'active' : ''" data-switch="1">
            <icon :icon="icons[1]" ></icon>
        </span>
        <span class="switch__indicator"></span>
    </div>
</template>

<script>
    export default {
        props: ["icons", "active"],
        methods: {
            toggleSwitch(value) {
                this.$emit("toggle-switch", value);
            }
        }
    };

</script>
