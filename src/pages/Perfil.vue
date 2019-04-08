<template>
    <div class="containerGrid">
        <div class="imgYinfoPrincipal">
            <v-avatar 
                class="imgUser" 
                @click="dialogImg = true" 
                color="grey darken-3" 
                size="200"
            >
                <img :src="user.img" alt="">
            </v-avatar>
            <p class="display-3">{{ user.nom }} {{ user.ape }}</p>

            <v-list v-if="user.guitarra || user.nacionalidad || user.webpage">
                <v-list-tile v-show="user.guitarra">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-guitar</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.guitarra }}</v-list-tile-title>
                        <v-list-tile-sub-title>Guitarra con la que toca actualmente</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.nacionalidad">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-map-marked-alt</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.nacionalidad }}</v-list-tile-title>
                        <v-list-tile-sub-title>Guitarrista de origen {{ user.nacionalidad }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-show="user.webpage">
                    <v-list-tile-avatar>
                        <v-icon>fas fa-mouse-pointer</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title><a :href="user.webpage" target="_blanck">{{ user.webpage }}</a></v-list-tile-title>
                        <v-list-tile-sub-title>Página web de {{ user.nom }} {{ user.ape }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
        <div class="biografia">
            <p class="headline">BIOGRAFÍA</p>
            <p>{{ user.biografia }}</p>
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
                nom: null,
                ape: null,
                nacionalidad: null,
                guitarra: null,
                biografia: null,
                webpage: null,
                img: null,
                redes: null
            }
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            axios.get(`${ this.$store.state.urlBackend }/usuarios/${ this.$store.state.user._id }`)
                .then((res) => {
                    let user = res.data.usuario
                    console.log('GET user', user)
                    this.fillDataUser(user)
                })
                .catch((err) => {
                    console.log(err.response)
                })
        },
        fillDataUser(user) {
            this.user.nom = user.nombre
            this.user.ape = user.apellidos
            this.user.nacionalidad = user.nacionalidad
            this.user.guitarra = user.guitarra
            this.user.biografia = user.biografia
            this.user.webpage = user.webpage
            this.getUserRedes(user)
            this.getImage(user)
        },
        getImage(user) {
            let self = this

            axios.get(`${ this.$store.state.urlBackend }/imagenes/imgusuarios/${ user.img }`, {
                responseType: 'blob'
            })
                .then((res) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(res.data)
                    reader.onload = function() {
                        let url = reader.result
                        self.user.img = url
                    }
                })
                .catch((err) => {
                    console.log('error imagen ', err)
                })
        },
        getUserRedes(user) {
            let redes = user.redes.map(r => r.red)
            
            this.user.redes = redes
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
    .imgYinfoPrincipal {
        grid-row: 1;
        justify-self: center;
        text-align: center;
    }
    .headline {
        text-align: center;
    }
</style>