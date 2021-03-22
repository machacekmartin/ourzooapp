<template>
    <div class="gallery">
        <transition name="fade">
            <div class="gallery__modal" v-if="modalActive" @click="closeModal">
                <div class="gallery__modal__slider">
                    <div class="gallery__modal__item" ref="slider" v-for="image in items">
                        <img class="gallery__modal__image" :src="'https://ourzoo.eu/assets/images/large/'+ image">
                    </div>
                </div>
                <span class="gallery__modal__control" @click="prevSlide()">
                    <icon icon="back"></icon>
                </span>
                <span class="gallery__modal__control" @click="nextSlide()">
                    <icon icon="next"></icon>
                </span>
            </div>
        </transition>
        <div class="gallery__items">
            <div class="gallery__item" @click="openModal(index)" v-for="(image, index) in items">
                <img  class="gallery__image" :src="'https://ourzoo.eu/assets/images/medium/'+ image" alt="image">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HorizontalSliderWidget',
    props: ['items'],
    data(){
        return {
            modalActive: false,
            slider: {
                element: null,
                ref: null
            }
        }
    },
    methods: {
        nextSlide(){
            this.slider.element.scrollLeft += this.slider.element.scrollWidth / this.slider.ref.length
        },
        prevSlide(){
            this.slider.element.scrollLeft -= this.slider.element.scrollWidth / this.slider.ref.length
        },
        openModal(index){
            this.modalActive = true;
            document.body.classList.add('modal-active');
            this.$nextTick(() => {
                this.slider.element = document.querySelector('.gallery__modal__slider');
                this.slider.ref = this.$refs.slider;
                this.slider.element.scrollLeft = index * this.slider.element.scrollWidth / this.slider.ref.length;
            })
        },
        closeModal(event){
            if(event.target.className === 'gallery__modal__item'){
                this.modalActive = false;
                document.body.classList.remove('modal-active');
            }
        }
    },
}
</script>