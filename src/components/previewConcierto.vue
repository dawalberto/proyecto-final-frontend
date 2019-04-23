<template>
    <v-card hover width="100%" id="card" :class="[conciertoDeleted ? 'deleted' : '']" class="cursorNormal">
        <v-img
            id="imgCard"
            :src="require('@/assets/logo-proyecto.png')"
            alt="img"
            loading="lazy"
        >
        </v-img>

        <div class="cuerpoCard">
            <p class="titulo headline font-weight-light brown--text text-darken-2">{{ conciertoObj.titulo }}</p>
            <hr>
            <p class="subheading">
                <a :href="urlToUser" :title="conciertoObj.usuario.nombre">
                    <v-avatar size="30" color="#EEEEEE" class="mr-1 lessOpacity">
                        <img :src="imgUser" alt="" id="imgUser" loading="lazy">
                    </v-avatar>
                    {{ conciertoObj.usuario.nombre }} {{ conciertoObj.usuario.apellidos }}
                </a>
            </p>
            <p class="subheading colorGreyDarken"><v-icon class="mr-2" color="brown lighten-2">event</v-icon>{{ getFecha }}</p>
            <p class="subheading colorGreyDarken"><v-icon class="mr-2" color="brown lighten-2">fas fa-clock</v-icon>{{ conciertoObj.hora }}</p>
            <p class="subheading colorGreyDarken"><v-icon class="mr-2" color="brown lighten-2">fas fa-map-marker-alt</v-icon>{{ conciertoObj.ubicacion }}</p>
            <p class="subheading colorGreyDarken"><v-icon class="mr-2" color="brown lighten-2">fas fa-money-bill</v-icon>{{ conciertoObj.precio }} €</p>
            <p @click="showDescription = !showDescription">
                <span class="subheading mr-2 colorGreyDarken"><v-icon class="mr-2" color="brown lighten-2">fas fa-align-left</v-icon>Descripción</span>
                <v-icon>{{ !showDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </p>
            <v-slide-y-transition>
                <v-card-text v-show="showDescription" class="colorGreyDarken subheading">{{ conciertoObj.descripcion }}</v-card-text>
            </v-slide-y-transition>
            <v-card-actions>
                <v-btn dark @click="dialogVistaPreviaProgram = true" block color="brown lighten-1">ver programa<v-icon class="ml-2">fas fa-book-open</v-icon></v-btn>
            </v-card-actions>
            <v-card-actions v-if="ownConcierto">
                <v-btn dark block @click="dialogConfirmDeleteConcierto = true" color="red darken-3">eliminar<v-icon class="ml-2">fas fa-trash-alt</v-icon></v-btn>                
                <v-btn dark block @click="dialogUpdateConcierto = true" color="blue darken-3">editar<v-icon class="ml-2">fas fa-edit</v-icon></v-btn>                
            </v-card-actions>
        </div>

        <v-dialog v-model="dialogVistaPreviaProgram">
            <previewprograma
            :obrasObj="conciertoObj.programa ? conciertoObj.programa.obras : ''"
            ></previewprograma>
        </v-dialog>

        <v-dialog v-model="dialogConfirmDeleteConcierto" max-width="500">
            <v-card class="cardDialogAlerDeleteConcierto" color="grey lighten-3">
                <p class="subheading">¿Deseas eliminar el concierto?</p>
                <v-btn block color="grey darken-3" dark @click="dialogConfirmDeleteConcierto = false">cancelar</v-btn>
                <v-btn block color="red darken-3" dark :loading="loading" @click="deleteConcierto">eliminar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAlertConciertoDeleted" max-width="500">
            <v-card class="cardDialogAlertConciertoDeleted" dark color="blue darken-3">
                <p class="subheading">Concierto eliminado correctamente</p>
                <v-btn block color="grey darken-3" @click="dialogAlertConciertoDeleted = false">aceptar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogUpdateConcierto" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
            <updateConcierto
            :conciertoObj="conciertoObj"
            @cancelDialogUpdateConciertoEvent="dialogUpdateConcierto = false"
            @closeDialogUpdateConciertoEvent="afterUpdateConcierto"
            >
            </updateConcierto>
        </v-dialog>
    </v-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import previewprograma from './previewPrograma'
import updateConcierto from './updateConcierto'

export default {
    name: 'previewConcierto',
    components: { previewprograma, updateConcierto },
    props: ['conciertoObj', 'paramId'],
    data() {
        return {
            imgUser: null,
            showDescription: false,
            urlToUser: `#/perfil/${ this.conciertoObj.usuario._id }`,
            dialogVistaPreviaProgram: false,
            dialogConfirmDeleteConcierto: false,
            dialogAlertConciertoDeleted: false,
            loading: false,
            conciertoDeleted: false,
            dialogUpdateConcierto: false
        }
    },
    mounted() {
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
        deleteConcierto() {
            this.loading = true
            axios.delete(`${ this.$store.state.urlBackend }/conciertos/${ this.conciertoObj._id }`)
                .then((res) => {
                    this.dialogConfirmDeleteConcierto = false
                    this.dialogAlertConciertoDeleted = true
                    this.conciertoDeleted = true
                    this.loading = false
                })
                .catch((err) => {
                    console.log(err.response)
                    this.loading = false
                })
        },
        afterUpdateConcierto() {
            this.dialogUpdateConcierto = false
            this.$router.push('/conciertos')
        }
    }
}
</script>

<style scoped>
    #imgCard {
        opacity: 0.9;
        height: 5rem;
        width: 5rem;
        margin-left: auto;
        margin-right: auto;

        -webkit-transform: rotate(0);
        -moz-transform: rotate(0);
        -o-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0);
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
    .cardDialogAlerDeleteConcierto, .cardDialogAlertConciertoDeleted {
        padding: 2rem;
    }
    .deleted {
        display: none;
    }
    .colorGreyDarken {
        color: #616161;
    }
    .lessOpacity {
        opacity: 0.8;
    }
    .cursorNormal {
        cursor: context-menu;
    }
    hr {
        margin-bottom: 1rem;
    }
    a {
        /* text-decoration: none; */
        color: #8D6E63;
    }

    @media (min-width: 960px) {
        #imgCard {
            opacity: 0.5;

            -webkit-transform: rotate(-180deg);
            -moz-transform: rotate(-180deg);
            -o-transform: rotate(-180deg);
            -ms-transform: rotate(-180deg);
            transform: rotate(-180deg);

            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            -ms-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
        #card:hover > #imgCard {
            opacity: 1;

            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
</style>
