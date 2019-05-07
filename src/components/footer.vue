<template>
    <div class="footer bg-blue-grey-darken-4">
        <div class="section1">
            <div class="newsletter col1-2">
                <p class="headline font-weight-light">Newsletter</p>
                <p class="font-weight-light">No te pierdas ningún concierto!</p>
                <v-text-field
                v-model="emailSuscriptor"
                :error-messages="msgEmail"
                label="Email"
                solo
                ></v-text-field>
                <v-btn 
                :loading="loadidngBtnSuscribir" 
                :disabled="loadidngBtnSuscribir" 
                :dark="loadidngBtnSuscribir" 
                @click="suscribir"
                class="ml-0 mt-0" 
                color="white"
                >
                Suscribirme
                </v-btn>
            </div>

            <v-dialog v-model="dialogNewsletter" persistent max-width="500">
                <v-card class="dialogNewsletter" color="grey lighten-3">
                    <p class="subheading">¡Enhorabuena, te has suscrito a las Newsletter!</p>
                    <p class="subheading">Ahora estarás al tanto de las novedades de clasicaguitarra.com</p>
                    <p class="subheading">Y cada vez que un guitarrista cree un concierto se te notificará por email para que no se te pase ninguno</p>
                    <v-btn block dark color="blue darken-3" @click="dialogNewsletter = false">aceptar</v-btn>
                </v-card>
            </v-dialog>

            <div class="contact col3 row1 align-self-center">
                <p class="headline font-weight-light">Contacto</p>
                <p class="font-weight-light blue-grey-lighten-4 mb-0">EMAIL</p>
                <p>clasicaguitarra.com.email@gmail.com</p>
            </div>
        </div>
        <div class="section2 mt-4">
            <a href="#/" class="linksMenu col1-3" style="margin-left: auto; margin-right: auto;"><img src="@/assets/logo-proyecto-white.png" class="logo" width="80" height="80" alt="Logo clasicaguitarra.com"></a>
            <a href="#/guitarristas" class="col1 linksMenu"><p class="text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-guitar</v-icon>GUITARRISTAS</p></a>
            <a href="#/conciertos" class="col2 linksMenu"><p class="text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-music</v-icon>CONCIERTOS</p></a>
            <a href="#/login" class="col3 linksMenu"><p class="text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-sign-in-alt</v-icon>LOGIN</p></a>
            <hr class="separatorHr col1-3">
            <p class="col1 text-xs-center font-weight-light"><a href="">Terms of Use</a> <a href="" class="ml-2">Privavy Policy</a></p>
            <p class="col2 text-xs-center font-weight-light">&copy; Copyright clasicaguitarra.com 2019</p>
            <p class="redes col3 text-xs-center">
                <a href=""><v-icon color="#CFD8DC">fab fa-twitter</v-icon></a>
                <a href="" class="ml-4"><v-icon color="#CFD8DC">fab fa-facebook</v-icon></a>
                <a href="" class="ml-4"><v-icon color="#CFD8DC">fab fa-youtube</v-icon></a>
            </p>
        </div>
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
            dialogNewsletter: false,
            loadidngBtnSuscribir: false
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
        suscribir() {
            if ( this.validateEmail(this.emailSuscriptor) ) {

                this.loadidngBtnSuscribir = true
                let suscriptor = { suscriptor: this.emailSuscriptor }

                axios.post(`${ this.$store.state.urlBackend }/suscriptores`, qs.stringify(suscriptor))
                    .then((res) => {
                        this.dialogNewsletter = true
                        this.loadidngBtnSuscribir = false
                        this.emailSuscriptor = null
                    })
                    .catch((err) => {
                        this.loadidngBtnSuscribir = false
                        console.log('err', err.response)
                    })

            }
        }
    },
}
</script>

<style scoped>
    .bg-blue-grey-darken-4 {
        background-color: #263238;
    }
    .bg-blue-grey-darken-1 {
        background-color: #546E7A;
    }
    .blue-grey-lighten-4 {
        color: #CFD8DC;
    }
    .footer {
        color: white;
    }
    .section1, .section2 {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: 100fr;
        padding: 2rem;
        justify-content: center;
    }
    .separatorHr {
        border: none;
        margin: 0 6rem;
        background-color: #B0BEC5;
        height: 1px;
    }
    .linksMenu {
        color: white;
    }
    .logo {
        align-self: center;
    }
    .section1 {
        background-color: #37474F;
    }
    .dialogNewsletter {
        padding: 2rem;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        .section1, .section2 {
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
        .newsletter {
            padding-right: 8rem;
        }
        .row1 {
            grid-row: 1;
        }
        .align-self-center {
            align-self: center;
        }
    }
</style>
