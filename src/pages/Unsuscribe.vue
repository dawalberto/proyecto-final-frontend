<template>
    <div class="container">
        <div class="col1-3">
            <p v-if="!getParamId" class="text-xs-left headline">¿Estás seguro/a de que no deseas recibir las Newsletter? no te enterarás de los conciertos que suba cualquier guitarrista y tampoco de las novedades de clasicaguitarra.com</p>
            <p v-else  class="text-xs-center headline">¿Estás seguro/a de que no deseas recibir notificaciones de los conciertos de este/a guitarrista?</p>
        </div>

        <v-text-field 
        v-model="emailSuscriptor"
        @keyup.enter="baja"
        :error-messages="msgEmail"
        label="Indica tu email"
        placeholder="email@email.com"
        class="col2">
        </v-text-field>

        <v-btn 
        :loading="loadidngBtnUnsuscribe" 
        :disabled="loadidngBtnUnsuscribe" 
        :dark="!loadidngBtnUnsuscribe" 
        class="col2"
        color="blue-grey darken-3"
        @click="baja"
        >
            darme de baja
        </v-btn>

        <!-- Dialogs -->
        <v-dialog v-model="dialogBaja" persistent max-width="500">
            <v-card class="dialogBaja" color="grey lighten-3">
                <p class="subheading">Te has dado de baja correctamente, ya no recibirás mas notificaciones</p>
                <v-btn block dark color="blue darken-3" @click="acceptDialogBaja">aceptar</v-btn>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data() {
        return {
            emailSuscriptor: null,
            msgEmail: null,
            dialogBaja: false,
            loadidngBtnUnsuscribe: false
        }
    },
    mounted() {
        this.$store.commit('pageIsMounted')    
    },
    computed: {
        getParamId() {
            return this.$route.params.id
        }
    },
    methods: {
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
        baja() {
            if (this.validateEmail(this.emailSuscriptor)) {

                this.loadidngBtnUnsuscribe = true
                
                if (this.getParamId) {
                    let suscriptor = { suscriptor: this.emailSuscriptor }
                    JSON.stringify(suscriptor)
                    console.log('suscriptor', suscriptor)

                    axios.put(`${ this.$store.state.urlBackend }/usuarios/${ this.getParamId }/unsuscribe`, suscriptor)
                        .then((res) => {
                            this.dialogBaja = true
                            this.loadidngBtnUnsuscribe = false
                            this.emailSuscriptor = null
                            console.log('res', res)
                        })
                        .catch((err) => {
                            this.loadidngBtnUnsuscribe = false    
                            err.response.data.msg ? this.msgEmail = 'Este email no está suscrito' : ''
                            console.log('err', err.response)
                        })
                } else {
                    axios.delete(`${ this.$store.state.urlBackend }/suscriptores`, { data: {email: this.emailSuscriptor} })
                        .then((res) => {
                            this.loadidngBtnUnsuscribe = false
                            this.dialogBaja = true
                            this.emailSuscriptor = null
                            console.log('res', res)
                        })
                        .catch((err) => {
                            this.loadidngBtnUnsuscribe = false
                            err.response.data.msg ? this.msgEmail = 'Este email no está suscrito' : ''
                            console.log('err', err.response)
                        })
                }

            }
        },
        acceptDialogBaja() {
            this.dialogBaja = false
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: 100fr;
        padding: 2rem;
        justify-content: center;
        align-content: center;
    }
    .align-self-center {
        align-self: center;
    }
    .justify-content-center {
        justify-content: center;
    }
    .dialogBaja {
        padding: 2rem;
    }

    @media (min-width: 960px) {
        .container {
            grid-template-columns: 30% 30% 30%;
        }
        .col1 {
            grid-column: 1;
        }
        .col2 {
            grid-column: 2;
        }
        .col3 {
            grid-column: 3;
        }
        .col1-2 {
            grid-column: 1 / 3;
        }
        .col1-3 {
            grid-column: 1 / 4;
        }
    }
</style>