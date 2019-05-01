<template>
    <div>
        <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
        <div class="backgroundScreen1"></div>
        <div class="backgroundScreen1-1"></div>

        <video autoplay muted loop class="backgroundScreen1 hiddeVideo">
            <source src="@/assets/video/background-guitar.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>

        <!-- <div class="backgroundColor"></div> -->
        <div class="screen1 zindex3">
            <v-container fluid fill-height>
                <v-layout align-center justify-center class="containerContentScreen1">
                    <v-flex xs12>
                        <transition name="slide-fade">
                            <p class="display-1 greyColorBlueDarken1 font-weight-thin text-xs-center" v-show="!pageLoading"><span>clasicaguitarra.com</span></p>
                        </transition>
                        <transition name="fade">
                            <p class="headline mt-4 greyColorBlueDarken1 font-weight-light text-xs-center contentText" v-show="!pageLoading">Un espacio creado para guitarristas clásicos/as donde podrás ver la trayectoria de los/las guitarristas y estar al tanto de todos sus conciertos</p>
                        </transition>
                        <transition name="slide-fade-row">
                            <p 
                            class="display-1 mt-2 greyColorBlueDarken1 font-weight-light text-xs-center" 
                            :class="conciertosWeek.length <= 0 ? 'displayNone' : ''"
                            v-show="!pageLoading"
                            >
                                <a href="#screen2anchor" v-smooth-scroll="{ duration: 1500, offset: -50 }">
                                    <span><v-icon large class="greyColorBlueDarken1">fas fa-chevron-down</v-icon></span>
                                </a>
                            </p>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div class="screen2" id="screen2anchor" :class="conciertosWeek.length <= 0 ? 'displayNone' : ''">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12>
                        <transition name="fade">
                            <p class="headline greyColorBlueDarken2 font-weight-light text-xs-center" v-show="!pageLoading">Conciertos de esta semana</p>
                        </transition>
                        <transition name="fadeConcierto">
                            <div class="containerConciertos" v-show="!pageLoading">
                                <previewConcierto
                                v-for="concierto of conciertosWeek"
                                :key="concierto._id"
                                :conciertoObj="concierto"
                                class="conciertosThisWeek"
                                ></previewConcierto>
                            </div>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import previewConcierto from '@/components/previewConcierto'

export default {
    name: 'home',
    components: { previewConcierto },
    data() {
        return {
            conciertosWeek: [],
            pageLoading: true
        }
    },
    mounted() {
        this.getConciertosThisWeek()
        this.$store.commit('pageIsMounted')
    },
    methods: {
        getConciertosThisWeek() {
            axios.get(`${ this.$store.state.urlBackend }/conciertos/this/week`)
                .then((res) => {
                    this.conciertosWeek =  this.getConciertosNotFinished(res.data.conciertos)
                    this.pageLoading = false
                })
                .catch((err) => {
                    console.log(err.response)
                    this.pageLoading = false
                })
        },
        getConciertosNotFinished(conciertos) {
            return conciertos.filter(concierto => {
                let today = new Date()
                let hoy = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                let dateConcierto = new Date(concierto.fecha)

                return dateConcierto >= hoy
            })
        }
    }

}
</script>

<style scoped>
    .conciertosThisWeek {
        background-color: #F5F5F5;
        grid-row: 1;
    }
    .containerConciertos {
        display: grid;
        grid-gap: 1.5rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        padding: 1rem;
    }

    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .fadeConcierto-enter-active, .fadeConcierto-leave-active {
        transition: opacity 3s;
    }
    .fadeConcierto-enter, .fadeConcierto-leave-to {
        opacity: 0;
    }

    .slide-fade-row-enter-active {
        transition: all 5s ease;
    }
    .slide-fade-row-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-row-enter, .slide-fade-row-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
    .screen1, .screen2 {
        width: 100%;
        height: 100vh;
        /* padding-bottom: 6rem; */
    }
    .greyColorBlueDarken1 {
        color: rgba(245, 245, 245, 0.897);
    }
    .greyColorBlueDarken2 {
        color: #546E7A;
    }
    .backgroundScreen1 {
        position: absolute;
        left: 0;
        top: 0;
        min-width: 100%;
        min-height: 100vh;
        background-image: url("../assets/imgs/man.jpg");
	    filter: grayscale(60%);
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .backgroundScreen1-1 {
        display: none;
    }
    .containerContentScreen1 {
        z-index: 1;
    }
    .displayNone {
        display: none;
    }
    .screen1 {
        position: relative;
    }
    .hiddeVideo {
        display: none;
    }
    .zindex3 {
        z-index: 3;
    }
    /* .backgroundColor {
        position: fixed;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #263238;
    } */
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        .hiddeVideo {
            display: block;
        }
        .backgroundScreen1 {
            background-image: none;
        }
        .backgroundScreen1-1 {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            min-width: 100%;
            min-height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: 2;
        }
        span, .contentText {
            padding: 2rem;
        }
        p {
            margin: 3rem;
        }
    }
</style>
