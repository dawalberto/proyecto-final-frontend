<template>
    <v-card hover width="100%" id="card" :class="[conciertoDeleted ? 'deleted' : '']" class="cursorNormal">
        <div v-show="!ownConcierto" :class="conciertoFinished ? 'classConciertoFinished': 'deleted'">
            <p class="headline">FINALIZADO</p>
        </div>

        <div class="containerImg">
            <v-img
                id="imgCard"
                :src="giveImgConcierto"
                alt="img"
                loading="lazy"
            >
            </v-img>
        </div>

        <div class="cuerpoCard">
            <p class="titulo headline font-weight-light greyColorBlueDarken4">{{ conciertoObj.titulo }}</p>
            <hr>
            <p class="subheading">
                <a :href="urlToUser" :title="conciertoObj.usuario.nombre">
                    <v-avatar size="30" color="#EEEEEE" class="mr-1 lessOpacity">
                        <img :src="imgUser" alt="" id="imgUser" loading="lazy">
                    </v-avatar>
                    {{ conciertoObj.usuario.nombre }} {{ conciertoObj.usuario.apellidos }}
                </a>
            </p>
            <p class="subheading greyColorBlueDarken1"><v-icon class="mr-2" color="blue-grey darken-3">event</v-icon>{{ getFecha }}</p>
            <p class="subheading greyColorBlueDarken1"><v-icon class="mr-2" color="blue-grey darken-3">fas fa-clock</v-icon>{{ conciertoObj.hora }}</p>
            <p class="subheading greyColorBlueDarken1"><v-icon class="mr-2" color="blue-grey darken-3">fas fa-map-marker-alt</v-icon>{{ conciertoObj.ubicacion }}</p>
            <p class="subheading greyColorBlueDarken1"><v-icon class="mr-2" color="blue-grey darken-3">fas fa-money-bill</v-icon>{{ conciertoObj.precio }} €</p>
            <p @click="showDescription = !showDescription">
                <span class="subheading mr-2 greyColorBlueDarken1"><v-icon class="mr-2" color="blue-grey darken-3">fas fa-align-left</v-icon>Descripción</span>
                <v-icon>{{ !showDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </p>
            <v-slide-y-transition>
                <v-card-text v-show="showDescription" class="greyColorBlueDarken1 subheading">{{ conciertoObj.descripcion }}</v-card-text>
            </v-slide-y-transition>
            <v-card-actions>
                <v-btn dark @click="dialogVistaPreviaProgram = true" block color="blue-grey darken-3">ver programa<v-icon class="ml-2">fas fa-book-open</v-icon></v-btn>
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
                <v-btn block color="red darken-3" :dark="!loading" :loading="loading" :disabled="loading" @click="deleteConcierto">eliminar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAlertConciertoDeleted" max-width="500">
            <v-card class="cardDialogAlertConciertoDeleted" color="grey lighten-3">
                <p class="subheading">Concierto eliminado correctamente</p>
                <v-btn block dark color="blue darken-3" @click="dialogAlertConciertoDeleted = false">aceptar</v-btn>
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
            imgUser: require('@/assets/no-image.png'),
            showDescription: false,
            urlToUser: `#/perfil/${ this.conciertoObj.usuario._id }`,
            dialogVistaPreviaProgram: false,
            dialogConfirmDeleteConcierto: false,
            dialogAlertConciertoDeleted: false,
            loading: false,
            conciertoDeleted: false,
            dialogUpdateConcierto: false,
            conciertoFinished: false,
        }
    },
    mounted() {
        if (this.conciertoObj.usuario.hasOwnProperty('img') && this.conciertoObj.usuario.img !== null && this.conciertoObj.usuario.img !== undefined && this.conciertoObj.usuario.img !== '') {
            this.imgUser = this.conciertoObj.usuario.img
        }

        this.isConciertoFinished()
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
        },
        giveImgConcierto() {
            return this.conciertoObj.img ? this.conciertoObj.img : require('@/assets/imgs/guitar2.jpg')
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
        },
        isConciertoFinished() {
            let hoy = new Date()
            hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

            if (new Date(this.conciertoObj.fecha) <hoy) {
                this.conciertoFinished = true
            }
        }
    }
}
</script>

<style scoped>
    .containerImg {
        width: 100%;
        height: 10rem;
    }
    #imgCard {
        opacity: 0.9;
        height: 100%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
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
    .greyColorBlueDarken1 {
        color: #546E7A;
    }
    .greyColorBlueDarken4 {
        color: #263238;
    }
    .lessOpacity {
        opacity: 0.9;
    }
    .cursorNormal {
        cursor: context-menu;
    }
    .classConciertoFinished {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: grid;
        justify-content: center;
        align-content: center;
        color: white;
    }
    hr {
        margin-bottom: 1rem;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        .containerImg {
            opacity: 0.9;

            /* -webkit-transform: rotate(-180deg);
            -moz-transform: rotate(-180deg);
            -o-transform: rotate(-180deg);
            -ms-transform: rotate(-180deg);
            transform: rotate(-180deg);

            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            -ms-transition: all 0.5s ease; */
            transition: all 0.5s ease;
        }
        #card:hover > .containerImg {
            opacity: 1;

            /* -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg); */
        }
    }
</style>
