<template>
    <v-card hover width="100%" max-width="100%" id="card">
        <v-img
            id="imgCard"
            src="https://cdn.pixabay.com/photo/2017/01/04/16/53/guitar-1952454_960_720.jpg"
            alt="img"
            aspect-ratio="2.75"
            loading="lazy"
        >
        </v-img>

        <div class="cuerpoCard">
            <p class="titulo headline font-weight-light">{{ conciertoObj.titulo }}</p>
            <hr>
            <p class="subheading">
                <a :href="urlToUser" :title="conciertoObj.usuario.nombre">
                    <v-avatar size="30" color="#EEEEEE" href="123">
                        <img :src="imgUser" alt="" id="imgUser" loading="lazy">
                    </v-avatar>
                    {{ conciertoObj.usuario.nombre }} {{ conciertoObj.usuario.apellidos }}
                </a>
            </p>
            <p class="subheading"><v-icon class="mr-2">fas fa-calendar-alt</v-icon>{{ getFecha }}</p>
            <p class="subheading"><v-icon class="mr-2">fas fa-clock</v-icon>{{ conciertoObj.hora }}</p>
            <p class="subheading"><v-icon class="mr-2">fas fa-map-marker-alt</v-icon>{{ conciertoObj.ubicacion }}</p>
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
                <v-btn dark @click="dialogVistaPreviaProgram = true" block color="drey darken-3">ver programa<v-icon class="ml-2">fas fa-book-open</v-icon></v-btn>
            </v-card-actions>
            <v-card-actions v-if="ownConcierto">
                <v-btn dark block color="red">eliminar<v-icon class="ml-2">fas fa-trash</v-icon></v-btn>                
                <v-btn dark block color="blue">editar<v-icon class="ml-2">fas fa-edit</v-icon></v-btn>                
            </v-card-actions>
        </div>

        <v-dialog v-model="dialogVistaPreviaProgram">
            <previewprograma
            :obrasObj="conciertoObj.programa ? conciertoObj.programa.obras : ''"
            ></previewprograma>
        </v-dialog>
    </v-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import previewprograma from './previewPrograma'

export default {
    name: 'previewConcierto',
    components: { previewprograma },
    props: ['conciertoObj', 'paramId'],
    data() {
        return {
            imgUser: null,
            showDescription: false,
            urlToUser: `#/perfil/${ this.conciertoObj.usuario._id }`,
            dialogVistaPreviaProgram: false,
            focused: false
        }
    },
    mounted() {
        console.log('this.conciertoObj', this.conciertoObj)
        console.log('this.conciertoObj.programa', this.conciertoObj.programa)
        this.$store.dispatch('getImage', this.conciertoObj.usuario.img)
            .then(img => this.imgUser = img)
            .catch(err => console.log('ERROR getImage previewConcierto.vue', err))
    },
    computed: {
        ...mapState(['login']),
        ...mapGetters(['userLoginStore']),
        getFecha() {
            let fecha = new Date(this.conciertoObj.fecha)
            return fecha.toLocaleDateString()
        },
        ownConcierto() {
            if (this.login && this.paramId !== undefined && this.conciertoObj.usuario._id === this.userLoginStore._id) {
                return true
            }
            return false
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    #imgCard {
        filter: blur(2px);
        filter: grayscale(60%);
    }
    #card:hover > #imgCard {
        filter: grayscale(30%);
    }
    #imgUser {
        filter: grayscale(20%);
    }
    #containerAvatar {
        z-index: 10;
    }
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
