<template>
    <div>
        <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
        <div class="screen1">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12>
                        <transition name="slide-fade">
                            <p class="display-2 brown--text font-weight-thin font-italic text-xs-center" v-show="!pageLoading">clasicaguitarra.com</p>
                        </transition>
                        <transition name="fade">
                            <p class="headline brown--text font-weight-light text-xs-center" v-show="!pageLoading">Un espacio creado para guitarristas clásicos/as donde podrás ver la trayectoria de los/las guitarristas y estar al tanto de todos sus conciertos</p>
                        </transition>
                        <transition name="slide-fade-row">
                            <p class="headline brown--text font-weight-light text-xs-center" v-show="!pageLoading"><a href="#screen2anchor"><v-icon medium color="brown lighten-1">fas fa-chevron-down</v-icon></a></p>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div class="screen2" id="screen2anchor">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12>
                        <transition name="fade">
                            <p class="headline brown--text font-weight-light text-xs-center" v-show="!pageLoading">Conciertos esta semana</p>
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
                    console.log(res)
                    this.conciertosWeek = res.data.conciertos
                    this.pageLoading = false
                })
                .catch((err) => {
                    console.log(err)
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
    a {
        text-decoration: none;
    }
</style>
