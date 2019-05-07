<template>
    <div class="containerGrid">
        <div class="imgYnom">
            <v-avatar 
                class="imgUser elevation-20 lessOpacity"
                color="#EEEEEE" 
                size="200"
                @click="dialogImg = true"
            >
                <img :src="user.img" alt="" loading="lazy">
            </v-avatar>
            <p class="font-weight-thin greyColorBlueDarken2" :class="mobile ? 'display-1 mt-2' : 'display-2 mt-1'">{{ user.nom }} {{ user.ape }}</p>
            <hr class="hrColor">
        </div>

         <v-dialog v-model="dialogImg" max-width="400">
            <img :src="user.img" alt="" loading="lazy">
         </v-dialog>
         
         <div class="detallesUser">
            <div v-if="user.guitarra || user.nacionalidad || user.webpage">
                <v-list-tile v-show="user.guitarra">
                    <v-list-tile-avatar>
                        <v-icon  color="blue-grey darken-3">fas fa-guitar</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title class="greyColorBlueDarken1">{{ user.guitarra }}</v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text">Guitarra con la que toca actualmente</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.fechaNac">
                    <v-list-tile-avatar>
                        <v-icon  color="blue-grey darken-3">fas fa-birthday-cake</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title class="greyColorBlueDarken1">{{ user.fechaNac }}</v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text">Fecha de nacimiento</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.nacionalidad">
                    <v-list-tile-avatar>
                        <v-icon  color="blue-grey darken-3">fas fa-map-marked-alt</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title class="greyColorBlueDarken1">{{ user.nacionalidad }}</v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text">Guitarrista {{ getGenero }} en {{ user.nacionalidad }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.webpage">
                    <v-list-tile-avatar>
                        <v-icon  color="blue-grey darken-3">fas fa-mouse-pointer</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title class="greyColorBlueDarken1"><a :href="user.webpage" target="_blanck">Página Web</a></v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text">Página web de {{ user.nom }} {{ user.ape }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </div>
         </div>

        <div class="biografia" v-if="user.biografia">
            <p class="headline font-weight-light greyColorBlueDarken2">Biografía</p>
            <p class="greyColorBlueDarken1 subheading" v-html="user.biografia"></p>
        </div>

        <div class="suscriptores">
            <p class="headline font-weight-light text-xs-left greyColorBlueDarken2">Hazte suscriptor de {{ user.nom }} y entérate de todos sus conciertos</p>
            <v-text-field
            v-model="emailSuscriptor"
            :error-messages="msgEmail"
            label="Email"
            ></v-text-field>
            <v-btn 
            block color="blue-grey darken-3" 
            :loading="loadidngBtnSuscribir" 
            :disabled="loadidngBtnSuscribir" 
            :dark="!loadidngBtnSuscribir" 
            @click="suscribir">
            suscribirme
            </v-btn>
        </div>

        <v-dialog v-model="dialogSuscriptor" persistent max-width="500">
            <v-card class="dialogSuscriptor" color="grey lighten-3">
                <p class="subheading">¡Enhorabuena! ahora eres suscriptor de {{ user.nom }}</p>
                <p class="subheading">Ahora cada vez que {{ user.nom }} cree un concierto se te notificará por email.</p>
                <v-btn block dark color="blue darken-3" @click="dialogSuscriptor = false">aceptar</v-btn>
            </v-card>
        </v-dialog>

        <div class="conciertos" v-if="user.nom">
            <p class="headline font-weight-light text-xs-center greyColorBlueDarken2">Todos los conciertos de {{ user.nom }}</p>
            <a :href="urlToConciertosUser">
                <v-btn block dark color="blue-grey darken-3"><v-icon class="mr-2">fas fa-music</v-icon>conciertos</v-btn>
            </a>
        </div>

        <div class="redes" v-if="user.redes.length > 0">
            <p class="headline font-weight-light greyColorBlueDarken2">Sigue a {{ user.nom }} {{ user.ape }}</p>
            <v-item-group multiple>
                <v-item v-show="getRed('Facebook')">
                    <a :href="getLinkRed('Facebook')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#3B5998">fab fa-facebook-f</v-icon>
                        </v-btn>
                    </a>
                </v-item>
                <v-item v-show="getRed('Instagram')">
                    <a :href="getLinkRed('Instagram')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#C43396">fab fa-instagram</v-icon>
                        </v-btn>
                    </a>
                </v-item>
                <v-item v-show="getRed('Twitter')">
                    <a :href="getLinkRed('Twitter')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#1DA1F2">fab fa-twitter</v-icon>
                        </v-btn>
                    </a>
                </v-item>
                <v-item v-show="getRed('Flickr')">
                    <a :href="getLinkRed('Flickr')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#0063DB">fab fa-flickr</v-icon>
                        </v-btn>
                    </a>
                </v-item>
                <v-item v-show="getRed('Snapchat')">
                    <a :href="getLinkRed('Snapchat')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#FFD600">fab fa-snapchat-square</v-icon>
                        </v-btn>
                    </a>
                </v-item>
                <v-item v-show="getRed('Tumblr')">
                    <a :href="getLinkRed('Tumblr')" target="_blank">
                        <v-btn fab>
                            <v-icon color="#314358">fab fa-tumblr-square</v-icon>
                        </v-btn>
                    </a>
                </v-item>
            </v-item-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'perfil',
    data() {
        return {
            user: {
                id: this.$route.params.id,
                nom: null,
                ape: null,
                sexo: null,
                fechaNac: null,
                nacionalidad: null,
                guitarra: null,
                biografia: null,
                webpage: null,
                img: null,
                redes: []
            },
            urlToConciertosUser: `#/conciertos/${ this.$route.params.id }`,
            breakpoint: this.$vuetify.breakpoint,
            mobile: true,
            dialogImg: false,
            msgEmail: null,
            emailSuscriptor: null,
            dialogSuscriptor: false,
            loadidngBtnSuscribir: false
        }
    },
    created() {
        this.getUser()
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false   
        this.$store.commit('pageIsMounted')
    },
    computed: {
        getGenero() {
            if (this.user.sexo) {
                return 'nacida'
            } else {
                return 'nacido'
            }
        }
    },
    methods: {
        getUser() {
            axios.get(`${ this.$store.state.urlBackend }/usuarios/${ this.$route.params.id }`)
                .then((res) => {
                    let user = res.data.usuario
                    this.fillDataUser(user)
                })
                .catch((err) => {
                    console.log('ERROR getUser en Perfil.vue', err.response)
                })
        },
        fillDataUser(user) {
            this.user.nom = user.nombre
            this.user.ape = user.apellidos
            this.user.sexo = user.sexo

            if (user.fechaNac !== null && user.fechaNac !== undefined && user.fechaNac !== '') {
                let fechaNac = new Date(user.fechaNac)
                this.user.fechaNac = fechaNac.toLocaleDateString()
            }

            this.user.nacionalidad = user.nacionalidad
            this.user.guitarra = user.guitarra

            if (user.biografia !== null && user.biografia !== undefined && user.biografia !== '') {
                this.user.biografia = this.formatBiografia(user.biografia)
            }

            this.user.webpage = user.webpage
            this.user.redes = user.redes

            if (!user.hasOwnProperty('img') || user.img === null || user.img === undefined || user.img === '') {
                this.user.img = require('@/assets/no-image.png')
            } else {
                this.user.img = user.img
            }
        },
        getRed(red) {
            for (let r of this.user.redes) {
                if (r.red === red) {
                    return true
                }
            }
            return false
        },
        getLinkRed(red) {
            for (let r of this.user.redes) {
                if (r.red === red) {
                    return r.link
                }
            }
        },
        formatBiografia(biografia) {
            return biografia.replace(/(\n)/g, '<br/>')
        },
        validateEmail(email) {
            if (this.emailSuscriptor === null || this.emailSuscriptor === undefined || this.emailSuscriptor === '') {
                this.msgEmail = 'El email es obligatório'
                return false
            }
            this.msgEmail = null

            let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let res = regEx.test(String(email).toLowerCase())
            res ? this.msgEmail = null : this.msgEmail = 'El email no es válido'
            return res
        },
        suscribir() {
            if ( this.validateEmail(this.emailSuscriptor) ) {

                this.loadidngBtnSuscribir = true
                let email = { email: this.emailSuscriptor }

                axios.post(`${ this.$store.state.urlBackend }/usuarios/${ this.user.id }/subscribe`, qs.stringify(email))
                    .then((res) => {
                        this.dialogSuscriptor = true
                        this.loadidngBtnSuscribir = false
                        this.emailSuscriptor = null
                    })
                    .catch((err) => {
                        this.loadidngBtnSuscribir = false
                        console.log('err', err.response)
                    })

            }
        }
    }
}
</script>

<style scoped>
    .containerGrid {
        display: grid;
        grid-template-columns: 100fr;
        grid-gap: 0.9rem;
    }
    .imgYnom {
        grid-row: 1;
        justify-self: center;
        text-align: center;
    }
    .detallesUser {
        grid-row: 2;
        margin-top: 3rem;
        justify-self: center;
    }
    .headline {
        text-align: center;
    }
    .biografia {
        grid-row: 3;
        margin-top: 6rem;
    }
    .redes {
        grid-row: 6;
        margin-top: 6rem;
        justify-self: center;
        text-align: center;
    }
    .suscriptores {
        grid-row: 4;
        margin-top: 6rem;
    }
    .conciertos {
        grid-row: 5;
        margin-top: 6rem;
    }
    .hrColor {
        /* background-image: linear-gradient(90deg, #78909C, transparent); */
        background-color: lightslategray;
        border: 0;
        height: 1px;
    }
    .greyColorBlueDarken1 {
        color: #546E7A;
    }
    .greyColorBlueDarken2 {
        color: #455A64;
    }
    .lessOpacity {
        opacity: 0.9;
    }
    .imgUser {
        cursor: pointer;
    }
    .dialogSuscriptor {
        padding: 2rem;
    }
    a {
        text-decoration: none;
    }


    @media (min-width: 960px) {
        .containerGrid {
            grid-template-columns: 25fr 25fr 25fr 25fr;
        }
        .imgYnom {
            grid-column: 1 / 5;
        }
        .detallesUser {
            grid-column: 1;
            justify-self: start;
        }
        .biografia {
            grid-column: 2 / 5;
            text-align: justify;
        }
        .suscriptores {
            grid-column: 1;
        }
        .conciertos {
            grid-column: 3 / 5;
        }
        .redes {
            grid-column: 1 / 5;
        }
    }
</style>