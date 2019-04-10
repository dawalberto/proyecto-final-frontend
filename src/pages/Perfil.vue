<template>
    <div class="containerGrid">
        <div class="imgYnom">
            <v-avatar 
                class="imgUser elevation-20"
                color="#EEEEEE" 
                size="200"
            >
                <img :src="user.img" alt="">
            </v-avatar>
            <p class="display-3 font-weight-thin">{{ user.nom }} {{ user.ape }}</p>
            <hr>
        </div>
         
         <div class="detallesUser">
            <div v-if="user.guitarra || user.nacionalidad || user.webpage">
                <v-list-tile v-show="user.guitarra">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-guitar</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.guitarra }}</v-list-tile-title>
                        <v-list-tile-sub-title>Guitarra con la que toca actualmente</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.fechaNac">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-birthday-cake</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.fechaNac }}</v-list-tile-title>
                        <v-list-tile-sub-title>Fecha de nacimiento</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.nacionalidad">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-map-marked-alt</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.nacionalidad }}</v-list-tile-title>
                        <v-list-tile-sub-title>Guitarrista {{ getGenero }} en {{ user.nacionalidad }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.webpage">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-mouse-pointer</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title><a :href="user.webpage" target="_blanck">Página Web</a></v-list-tile-title>
                        <v-list-tile-sub-title>Página web de {{ user.nom }} {{ user.ape }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </div>
         </div>

        <div class="biografia">
            <p class="headline font-weight-light">Biografía</p>
            <p>{{ user.biografia }}</p>
        </div>

        <div class="conciertos">
            <p class="headline font-weight-light">No te pierdas ningún concierto de {{ user.nom }}</p>
            <a :href="urlToConciertosUser">
                <v-btn block outline color="primary"><v-icon class="mr-2">fas fa-music</v-icon>conciertos</v-btn>
            </a>
        </div>

        <div class="redes">
            <p class="headline font-weight-light">Sigue a {{ user.nom }} {{ user.ape }}</p>
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
                redes: ''
            },
            urlToConciertosUser: `#/conciertos/${ this.$route.params.id }`
        }
    },
    created() {
        this.getUser()
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

            let fechaNac = new Date(user.fechaNac)
            this.user.fechaNac = fechaNac.toLocaleDateString()

            this.user.nacionalidad = user.nacionalidad
            this.user.guitarra = user.guitarra
            this.user.biografia = user.biografia
            this.user.webpage = user.webpage
            this.user.redes = user.redes

            let self = this
            this.$store.dispatch('getImage', user.img)
                .then(img => self.user.img = img)
                .catch(err => console.log(err))
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
        }
    }
}
</script>

<style scoped>
    .containerGrid {
        display: grid;
        grid-template-columns: 100%;
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
        margin-top: 3rem;
    }
    a {
        text-decoration: none;
    }
    .redes {
        grid-row: 5;
        margin-top: 3rem;
        justify-self: center;
        text-align: center;
    }
    .conciertos {
        grid-row: 4;
        margin-top: 3rem;
    }


    @media (min-width: 960px) {
        .containerGrid {
            grid-template-columns: 25% 25% 25% 25%;
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
        .conciertos {
            grid-column: 1;
        }
        .redes {
            grid-column: 1 / 5;
        }
    }
</style>