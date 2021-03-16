<template>
    <div class="page">
        <div class="intro">
            <div class="intro__panel" :style="'transform: translateX('+currentPosition+'%)'">
                <div class="intro__block">
                    <img class="intro__image intro__image--lgreen" src="@/static/images/intro-panel-1.jpg">
                    <div class="intro__content">
                        <div class="intro__content__header">
                            <h3>Vítejte v aplikaci</h3>
                            <h2 class="intro__highlight intro__highlight--lgreen">Our Zoo</h2>
                        </div>
                        <p>Sjednocující aplikace pro jakoukoliv zoo,
                            která se do tohoto projektu chce zapojit.</p>
                    </div>
                    <button @click="next()" class="intro__button button button--lgreen">
                        <icon icon="next"></icon>
                    </button>
                </div>
            </div>

            <div class="intro__panel" :style="'transform: translateX('+currentPosition+'%)'">
                <div class="intro__block">
                    <img class="intro__image intro__image--lblue" src="@/static/images/intro-panel-2.jpeg">
                    <div class="intro__content">
                        <div class="intro__content__header">
                            <h3>Doporučená nastavení</h3>
                        </div>
                        <p>Pro maximální zážitek je doporučeno povolit <span
                                class="intro__highlight intro__highlight--lblue">sdílení aktuální polohy</span></p>
                    </div>
                    <div class="intro__controls">
                        <button @click="previous()" class="intro__button button button--dgreen">
                            <icon icon="back"></icon>
                        </button>
                        <button @click="letsgo()" class="intro__button button button--lblue">
                            <icon icon="checkmark"></icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from '@/components/Icon.vue';
    export default {
        name: 'Intro',
        components: {
            Icon
        },
        data() {
            return {
                currentPosition: 0,
            }
        },
        methods: {
            next() {
                this.currentPosition -= 100;
            },
            previous() {
                this.currentPosition += 100;
            },
            letsgo() {
                cordova.plugins.permissions.checkPermission(cordova.plugins.permissions.ACCESS_FINE_LOCATION, device => {
                    if (!device.hasPermission){
                        cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.ACCESS_FINE_LOCATION, (succ) => {}, (err) => {});
                    }
                });
            },
        },
    }
</script>