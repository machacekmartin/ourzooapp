<template>
    <label class="input">
        <span class="input__icon">
            <icon icon="search"></icon>
        </span>
        <input :value="searchValue" @input='evt => searchValue = evt.target.value' class="input__text padding--sm-l" type="text" :placeholder="placeholder">
    </label>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'SearchWidget',
    props: ['placeholder'],
    data(){
        return {
            searchValue: ''
        }
    },
    watch:{
        searchValue(){
            this.$emit('update', this.searchValue);
        }
    }
}
</script>