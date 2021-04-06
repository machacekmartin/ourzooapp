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
                    <custom-button @clicked="$router.push('/zoo/'+ oneSpecies.zooId +'/map?type=species&target=' + oneSpecies._id)" class="button--texticon page__button" type="lblue" text="Najít na mapě" icon="location"></custom-button>
                    <custom-button type="dgreen" icon="location"></custom-button>
                </div>
            </div>
            <h3 class="padding--lg-t padding--h">Galerie zvířete</h3>
            <gallery-widget :items="oneSpecies.gallery.images"></gallery-widget>

            <div class="page__info padding--t padding--h">
                <h3>Informace o tomto druhu</h3>
                <p>{{ oneSpecies.description }}</p>
            </div>

            <div class="padding--t padding--h padding--lg-b">
                <h3 >Příslušná expozice</h3>
                <list-widget :items="[oneSpecies.exposition]" link="Zoo Exposition" size="small"></list-widget>
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
    methods: {
        ...mapActions('species', ['LoadOneSpecies'])

    },
    computed: {
        ...mapGetters('species', ['oneSpecies'])
    },
    async created(){
        await this.LoadOneSpecies(this.$route.params.detailId);
    }
}
</script>