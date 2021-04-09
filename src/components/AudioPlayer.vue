<template>
    <div class="audio-player">
        <div class="audio-player__details">
            <h4 class="audio-player__text">{{ target.name }}</h4>
            <audio ref="player" @ended="pause()" :src="'https://ourzoo.eu/assets/audio/'+target.audio" type="audi/mpeg" preload="auto"></audio>
            <div class="audio-player__track" @click="setCurrentTime">
                <span class="audio-player__path" :style="'width: '+ percentage + '%'"></span>
                <span class="audio-player__circle" :style="'left: '+ percentage +'%'"></span>
            </div>
        </div>
        <div class="audio-player__controls">
            <custom-button v-if="isPlaying" @clicked="pause()" class="audio-player__button button--dgreen" icon="pause"></custom-button>
            <custom-button v-else @clicked="resume()" class="audio-player__button button--dgreen" icon="play"></custom-button>
            <custom-button @clicked="stop()" class="audio-player__button button--red" icon="stop"></custom-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'AudioPlayer',
    data(){
        return {
            player: null,
            duration: null,
            currentTime: null
        }
    },
    computed: {
        ...mapGetters('audio', ['target', 'isPlaying']),
        durationMinSec(){
            const minutes = Math.floor(this.duration / 60);
            const seconds = this.duration - minutes * 60;
            return minutes + ':' + seconds;
        },
        percentage(){
            return parseInt((this.currentTime / this.duration) * 100);
        }
    },
    watch: {
        isPlaying(){
            if (this.isPlaying){
                this.player.play();
            }
            else{
                this.player.pause(); 
            }
        },
        async target(){
            await this.initNewAudio();
        }
    },
    methods: {
        ...mapActions('audio', ['setTarget', 'updateIsPlaying']),
        pause(){
            this.updateIsPlaying(false);
        },
        resume(){
            this.updateIsPlaying(true);
        },
        stop(){
            this.setTarget(null);
            this.updateIsPlaying(false);
        },
        setCurrentTime(e){
            const division = e.offsetX / e.target.offsetWidth
            this.player.currentTime = this.duration * division;
            this.player.play();
        },
        async initNewAudio(){
            await this.player.addEventListener("loadeddata", () => {
                this.duration = parseInt(this.player.duration);
            });
            await this.player.addEventListener("timeupdate", () => {
                this.currentTime = parseInt(this.player.currentTime);
            });

            this.player.play();
            this.resume();
            
        }
    },
    async mounted(){
        this.player = this.$refs.player;
        await this.initNewAudio();
    },
}
</script>