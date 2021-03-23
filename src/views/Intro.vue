<template>
    <div class="page page--full">
        <div class="intro">
            <div class="intro__panel" :style="'transform: translateX('+currentPosition+'%)'">
                <div class="intro__block">
                    <img class="intro__image intro__image--lgreen" src="@/static/images/intro-panel-1.jpg" alt="background">
                    <div class="intro__content">
                        <div class="intro__content__header">
                            <h3>Vítejte v aplikaci</h3>
                            <h2 class="intro__highlight intro__highlight--lgreen">Our Zoo</h2>
                        </div>
                        <p>Sjednocující aplikace pro jakoukoliv zoo,
                            která se do tohoto projektu chce zapojit.</p>
                    </div>
                    <custom-button @clicked="next()" class="intro__button" type="lgreen" icon="next"></custom-button>
                </div>
            </div>

            <div class="intro__panel" :style="'transform: translateX('+currentPosition+'%)'">
                <div class="intro__block">
                    <img class="intro__image intro__image--lblue" src="@/static/images/intro-panel-2.jpeg" alt="background">
                    <div class="intro__content">
                        <div class="intro__content__header">
                            <h3>Doporučená nastavení</h3>
                        </div>
                        <p>Pro maximální zážitek (např interaktivní mapa a řazení dle vzdálenosti) je nutné povolit <span
                                class="intro__highlight intro__highlight--lblue">sdílení aktuální polohy</span></p>
                    </div>
                    <div class="intro__controls">
                        <custom-button @clicked="previous()" class="intro__button" type="dgreen" icon="back"></custom-button>
                        <custom-button @clicked="letsgo()" class="intro__button" type="lblue" icon="checkmark"></custom-button>
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
                localStorage.setItem('introPassed', true);
                alert("Dám tě na homepage s přehledem všech zoo");
                this.$router.push('Home');
            },
        },
        beforeCreate(){
            if (localStorage.getItem('introPassed')){
                alert("Už tady byls");
                this.$router.push('Home');
            }
        },
    }
</script>