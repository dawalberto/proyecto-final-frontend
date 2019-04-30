<template>
    <div>
        <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
        <div class="backgroundScreen1"></div>
        <div class="screen1">
            <v-container fluid fill-height>
                <v-layout align-center justify-center class="containerContentScreen1">
                    <v-flex xs12>
                        <transition name="slide-fade">
                            <p class="display-2 greyColorBlueDarken1 font-weight-thin text-xs-center" v-show="!pageLoading">clasicaguitarra.com</p>
                        </transition>
                        <transition name="fade">
                            <p class="headline mt-4 greyColorBlueDarken1 font-weight-light text-xs-center" v-show="!pageLoading">Un espacio creado para guitarristas clásicos/as donde podrás ver la trayectoria de los/las guitarristas y estar al tanto de todos sus conciertos</p>
                        </transition>
                        <transition name="slide-fade-row">
                            <p 
                            class="display-3 mt-4 greyColorBlueDarken1 font-weight-light text-xs-center" 
                            :class="conciertosWeek.length <= 0 ? 'displayNone' : ''"
                            v-show="!pageLoading"
                            >
                                <a href="#screen2anchor" v-smooth-scroll="{ duration: 1500, offset: -50 }">
                                    <v-icon large class="greyColorBlueDarken1">fas fa-chevron-down</v-icon>
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
        padding-bottom: 6rem;
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
        width: 100%;
        min-height: 100vh;
        background-image: url("https://jonathanestevearanda.files.wordpress.com/2018/03/jonathan-esteve-aranda-4.jpg?w=1180");
        /* background-image: url("https://cdn.pixabay.com/photo/2015/10/12/15/13/man-984307_960_720.jpg"); */
	    filter: blur(6px);
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .containerContentScreen1 {
        z-index: 1;
    }
    .displayNone {
        display: none;
    }
    a {
        text-decoration: none;
    }
</style>
