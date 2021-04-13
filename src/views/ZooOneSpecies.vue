<template>
    <div class="page">    
        <heading type="single"></heading>
        <div class="species" v-if="oneSpecies">
            <div class="page__header">
                <img class="page__background" src="@/static/images/intro.jpg" alt="species kind background">
                <img class="page__image" :src="'https://ourzoo.eu/assets/images/medium/'+ oneSpecies.image" :alt="oneSpecies.name">
            </div>
           
            <div class="page__body padding--h padding--lg-b padding--xl-t">
                <h2 class="page__title padding--t">
                    {{ oneSpecies.name }}
                </h2>
                <div class="page__details padding--sm-t padding--sm-b">
                    <div class="page__detail">
                        <span class="page__detail__icon">
                            <icon icon="species"></icon>
                        </span>
                        <h4>{{ oneSpecies.type.name }}</h4>
                    </div>
                    <div class="page__detail">
                        <span class="page__detail__icon">
                            <icon icon="life"></icon>
                        </span>
                        <h4>{{ oneSpecies.life }}</h4>
                    </div>
                    <div class="page__detail">
                        <span class="page__detail__icon">
                            <icon icon="exclamation"></icon>
                        </span>
                        <h4>{{ oneSpecies.endangered }}</h4>
                    </div>
                    <div class="page__detail">
                        <span class="page__detail__icon">
                            <icon icon="size"></icon>
                        </span>
                        <h4>{{ oneSpecies.size }}</h4>
                    </div>
                </div>
                <div class="page__buttons">
                    <custom-button v-if="oneSpecies.location && oneSpecies.location.length" @clicked="$router.push('/zoo/'+ oneSpecies.zooId +'/map?type=species&target=' + oneSpecies._id)" class="button--texticon page__button" type="lblue" text="Najít na mapě" icon="location"></custom-button>
                    <template v-if="oneSpecies.audio">
                        <template v-if="target === oneSpecies">
                            <custom-button v-if="!isPlaying" @clicked="updateIsPlaying(true)" type="dgreen" icon="play"></custom-button>
                            <custom-button v-else @clicked="updateIsPlaying(false)" type="dgreen" icon="pause"></custom-button>
                        </template>
                        <template v-else>
                            <custom-button @clicked="setTarget(oneSpecies)" type="dgreen" icon="play"></custom-button>
                        </template>
                    </template>
                </div>
            </div>
            <h3 class="padding--lg-t padding--h">Galerie zvířete</h3>
            <gallery-widget :items="oneSpecies.gallery.images"></gallery-widget>

            <div class="page__info padding--t padding--h">
                <h3>Informace o tomto druhu</h3>
                <p>{{ oneSpecies.description }}</p>
            </div>

            <div class="padding--t padding--h padding--lg-b">
                <h3>Příslušná expozice</h3>
                <list-widget v-if="oneSpecies.exposition" :items="[oneSpecies.exposition]" link="Zoo Exposition" size="small"></list-widget>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GalleryWidget from '@/components/widgets/Gallery.vue';
import Heading from '@/components/Heading.vue';
import ListWidget from '@/components/widgets/List.vue';
export default {
    name: 'ZooOneSpecies',
    components: {
        GalleryWidget,
        ListWidget,
        Heading
    },
    computed: {
        ...mapGetters('species', ['oneSpecies']),
        ...mapGetters('audio', ['target', 'isPlaying'])
    },
    methods: {
        ...mapActions('species', ['LoadOneSpecies', 'ResetOneSpecies']),
        ...mapActions('audio', ['setTarget', 'updateIsPlaying'])

    },
    async created(){
        await this.LoadOneSpecies(this.$route.params.detailId);
    },
    
    beforeDestroy(){
        this.ResetOneSpecies();
    }
}
</script>