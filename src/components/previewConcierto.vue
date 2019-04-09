<template>
    <v-card hover width="100%" max-width="100%">
        <v-img
            src="https://cdn.pixabay.com/photo/2017/01/04/16/53/guitar-1952454_960_720.jpg"
            alt="img"
            aspect-ratio="2.75"
        >
            <v-container fill-height fluid>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <a :href="urlToUser" :title="conciertoObj.usuario.nombre">
                            <v-avatar size="90" color="#EEEEEE" href="123">
                                <img :src="imgUser" alt="">
                            </v-avatar>
                        </a>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>

        <div class="cuerpoCard">
            <p class="titulo headline font-weight-light">{{ conciertoObj.titulo }}</p>
            <hr>
            <p class="subheading"><v-icon class="mr-2">fas fa-calendar-alt</v-icon>{{ getFecha }}</p>
            <p class="subheading"><v-icon class="mr-2">fas fa-clock</v-icon>{{ conciertoObj.hora }}</p>
            <p class="subheading"><v-icon class="mr-2">fas fa-guitar</v-icon><a :href="urlToUser">{{ conciertoObj.usuario.nombre }} {{ conciertoObj.usuario.apellidos }}</a></p>
            <p class="subheading"><v-icon class="mr-2">fas fa-money-bill</v-icon>{{ conciertoObj.precio }} €</p>
            <p>
                <span class="subheading"><v-icon class="mr-2">fas fa-align-left</v-icon>Descripción</span>
                <v-btn icon @click="showDescription = !showDescription">
                    <v-icon>{{ !showDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </p>
            <v-slide-y-transition>
                <v-card-text v-show="showDescription">{{ conciertoObj.descripcion }}</v-card-text>
            </v-slide-y-transition>
            <v-card-actions>
                <v-btn dark block color="drey darken-3">VER PROGRAMA<v-icon class="ml-2">fas fa-book-open</v-icon></v-btn>
            </v-card-actions>
        </div>

    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'previewConcierto',
    props: ['conciertoObj'],
    data() {
        return {
            imgUser: null,
            showDescription: false,
            urlToUser: `#/perfil/${ this.conciertoObj.usuario._id }`
        }
    },
    mounted() {
        this.getImage()
    },
    computed: {
        getFecha() {
            let fecha = new Date(this.conciertoObj.fecha)
            return fecha.toLocaleDateString()

        }
    },
    methods: {
        getImage() {
            let self = this

            axios.get(`${ this.$store.state.urlBackend }/imagenes/imgusuarios/${ this.conciertoObj.usuario.img }`, {
                responseType: 'blob'
            })
                .then((res) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(res.data)
                    reader.onload = function() {
                        let url = reader.result
                        self.imgUser = url
                    }
                })
                .catch((err) => {
                    console.log('error imagen ', err)
                })
        }
    }
}
</script>

<style scoped>
    .titulo {
        text-align: center;
    }
    .cuerpoCard {
        padding: 1.2rem;
    }
    hr {
        margin-bottom: 1rem;
    }
    a {
        text-decoration: none;
    }
</style>