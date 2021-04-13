<template>
    <div class="page" v-if="exposition">    
        <heading type="single"></heading>
        <div class="page__header">
            <img class="page__background" :src="'https://ourzoo.eu/assets/images/medium/'+ exposition.image" :alt="exposition.name">
            <div class="page__buttons">
                <custom-button @clicked="$router.push('/zoo/'+ exposition.zooId +'/map?type=expositions&target=' + exposition._id)" class="button--texticon page__button" type="lblue" text="Najít na mapě" icon="location"></custom-button>
                <template v-if="exposition.audio">
                    <template v-if="target === exposition">
                        <custom-button v-if="!isPlaying" @clicked="updateIsPlaying(true)" type="dgreen" icon="play"></custom-button>
                        <custom-button v-else @clicked="updateIsPlaying(false)" type="dgreen" icon="pause"></custom-button>
                    </template>
                    <template v-else>
                        <custom-button @clicked="setTarget(exposition)" type="dgreen" icon="play"></custom-button>
                    </template>
                </template>
            </div>
        </div>
        <div class="page__body padding--h padding--lg-t">
            <h2 class="margin--t">{{ exposition.name }}</h2>
            <div class="padding--b">
                <p>{{ exposition.description }}</p>
            </div>
        </div>
        <h3 class="padding--t padding--h">Galerie</h3>
        <gallery-widget :items="exposition.gallery.images"></gallery-widget>´

        <h3 class="padding--t padding--h">Zvířata v této epozici</h3>
        <list-widget class="padding--h padding--lg-b" :items="exposition.species" size="small" link="Zoo One Species"></list-widget>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { polyline } from 'leaflet';
import GalleryWidget from '@/components/widgets/Gallery.vue';
import ListWidget from '@/components/widgets/List.vue';
import Heading from '@/components/Heading.vue'
export default {
    name: 'ZooOneSpecies',
    components: {
        GalleryWidget,
        ListWidget,
        Heading
    },
    methods: {
        ...mapActions('expositions', ['LoadExposition', 'ResetExposition']),
        ...mapActions('audio', ['setTarget', 'updateIsPlaying'])
    },
    computed: {
        ...mapGetters('expositions', ['exposition']),
        ...mapGetters('audio', ['target', 'isPlaying']),
        
    },
    async created(){
        await this.LoadExposition(this.$route.params.detailId);
    },
    beforeDestroy(){
        this.ResetExposition();
    }
}
</script>