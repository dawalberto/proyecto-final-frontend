<template>
    <div>
        <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
        <div class="backgroundShadow"></div>
        <!-- <div class="showInDesktopHiddeInMobile backgroundColor" :class="conciertosWeek.length <= 0 ? 'bgWhite' : ''"></div> -->

        <div class="backgroundScreen1">
            <video autoplay muted loop playsinline class="backgroundScreen1 showInDesktopHiddeInMobile">
                <source v-if="!mobile" src="@/assets/video/background-guitar.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
        </div>

        <div class="screen1 zindex3">
            <v-container fluid fill-height>
                <v-layout align-center justify-center class="containerContentScreen1">
                    <v-flex xs12>
                        <transition name="slide-fade">
                            <p v-show="transition1" class="display-1 greyColorBlueDarken1 font-weight-thin text-xs-center"><span>clasicaguitarra.com</span></p>
                        </transition>
                        <p style="visibility: hidden;" v-show="!transition1" class="display-1 greyColorBlueDarken1 font-weight-thin text-xs-center"><span>clasicaguitarra.com</span></p>
                        <transition name="slide-fade">
                            <p v-show="transition2" class="headline mt-4 greyColorBlueDarken1 font-weight-light text-xs-center contentText">Un espacio creado para guitarristas clásicos/as donde podrás ver la trayectoria de los/las guitarristas y estar al tanto de todos sus conciertos</p>
                        </transition>
                            <p style="visibility: hidden;" v-show="!transition2" class="headline mt-4 greyColorBlueDarken1 font-weight-light text-xs-center contentText">Un espacio creado para guitarristas clásicos/as donde podrás ver la trayectoria de los/las guitarristas y estar al tanto de todos sus conciertos</p>
                        <transition name="slide-fade">
                            <p 
                            class="display-1 mt-2 greyColorBlueDarken1 font-weight-light text-xs-center" 
                            :class="conciertosWeek.length <= 0 ? 'displayNone' : ''"
                            v-show="transition3"
                            >
                                <a href="#screen2anchor" v-smooth-scroll="{ duration: 1500, offset: -50 }">
                                    <span><v-icon large class="greyColorBlueDarken1">fas fa-chevron-down</v-icon></span>
                                </a>
                            </p>
                        </transition>
                        <p 
                            style="visibility: hidden;" 
                            class="display-1 mt-2 greyColorBlueDarken1 font-weight-light text-xs-center" 
                            :class="conciertosWeek.length <= 0 ? 'displayNone' : ''"
                            v-show="!transition3"
                            >
                                <a href="#screen2anchor" v-smooth-scroll="{ duration: 1500, offset: -50 }">
                                    <span><v-icon large class="greyColorBlueDarken1">fas fa-chevron-down</v-icon></span>
                                </a>
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div class="screen2" id="screen2anchor" v-if="conciertosWeek.length > 0">
            <v-container fluid fill-height>
                <v-layout align-center justify-center class="zindex3">
                    <v-flex xs12>
                        <transition name="slide-fade">
                            <p class="headline greyColorBlueDarken2 font-weight-light text-xs-center" v-show="!pageLoading">Conciertos para esta semana</p>
                        </transition>
                        <transition name="slide-fade">
                            <div class="containerConciertos" v-show="!pageLoading">
                                <previewConcierto
                                v-for="concierto of conciertosWeek"
                                :key="concierto._id"
                                :conciertoObj="concierto"
                                class="conciertosThisWeek widthCards"
                                ></previewConcierto>
                            </div>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div v-else>
            <p class="headline greyColorBlueDarken2 font-weight-light text-xs-center" v-show="!pageLoading">No hay conciertos para esta semana</p>
            <p 
            class="headline greyColorBlueDarken2 font-weight-light text-xs-center" 
            v-show="!pageLoading">
                Pero puedes ver los que están por llegar
                <v-btn 
                to="/conciertos" 
                dark 
                color="blue-grey darken-3" 
                class="letterSpacing01">
                    <v-icon class="mr-2">fas fa-music</v-icon>
                    conciertos
                </v-btn>
            </p> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import previewConcierto from '@/components/previewConcierto'
import { setTimeout } from 'timers';

export default {
    name: 'home',
    components: { previewConcierto },
    data() {
        return {
            conciertosWeek: [],
            pageLoading: true,
            mobile: true,
            breakpoint: this.$vuetify.breakpoint,
            transition1: false,
            transition2: false,
            transition3: false
        }
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
        this.getConciertosThisWeek()
        this.$store.commit('pageIsMounted')
    },
    watch: {
        pageLoading(newVal) {
            setTimeout(() => {
                this.transition1 = true
            }, 500)
            setTimeout(() => {
                this.transition2 = true
            }, 2000)
            setTimeout(() => {
                this.transition3 = true
            }, 3000)
        }
    },
    methods: {
        getConciertosThisWeek() {
            axios.get(`${ this.$store.state.urlBackend }/conciertos/this/week`)
                .then((res) => {
                    this.conciertosWeek =  this.getConciertosNotFinished(res.data.conciertos)
                    this.pageLoading = false
                })
                .catch((err) => {
                    // console.log(err.response)
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
        transform: translateX(60px);
        opacity: 0;
    }

    .screen1, .screen2 {
        width: 100%;
        height: 100vh;
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
        z-index: 1;
        overflow:hidden;
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
    .showInDesktopHiddeInMobile, .backgroundShadow {
        display: none;
    }
    .zindex3 {
        z-index: 3;
    }
    .backgroundColor {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        min-width: 100%;
        min-height: 100%;
        background-color: #263238;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 0;
    }
    .bgWhite {
        background-color: white;
    }
    .widthCards {
        min-width: 320px;
    }
    .letterSpacing01 {
        letter-spacing: 0.2rem;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        .showInDesktopHiddeInMobile {
            display: block;
        }
        .backgroundScreen1 {
            background-image: none;
        }
        .backgroundShadow {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            min-width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: 2;
        }
        .greyColorBlueDarken2 {
            color: #37474F;
        }
        span, .contentText {
            padding: 2rem;
        }
        p {
            margin: 3rem;
        }
    }
</style>
