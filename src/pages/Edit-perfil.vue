<template>
    <div class="containerGrid">
        <v-dialog v-model="dialogImg" color="grey lighten-3" max-width="400">
            <v-card>
                <croppa
                    id="croppaId"
                    v-model="croppa"
                    :placeholder="!mobile ? 'Haz zoom para recortar la imagen' : ''"
                    accept=".jpg,.jpeg,.png"
                    :placeholder-font-size="16"
                    :show-remove-button="false"
                    :prevent-white-space="true"
                    :zoom-speed="5"
                    :width="400"
                    :height="400"
                    :quality="1"
                ></croppa>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-3"
                    dark
                    @click="croppaChoseFile"
                >
                    <v-icon :class="[!mobile ? 'mr-3' : '']" v-show="mobile">fas fa-cloud-upload-alt</v-icon><span v-show="!mobile">SUBIR</span>
                </v-btn>
                <v-btn
                    color="red darken-3"
                    dark
                    @click="dialogImg = false"
                >
                    <v-icon :class="[!mobile ? 'mr-3' : '']" v-show="mobile">fas fa-times-circle</v-icon><span v-if="!mobile">CANCELAR</span>
                </v-btn>
                <v-btn
                    color="green darken-3"
                    dark
                    @click="generateImage"
                >
                    <v-icon :class="[!mobile ? 'mr-3' : '']" v-show="mobile">fas fa-check-circle</v-icon><span v-if="!mobile">GUARDAR</span>
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-avatar 
            class="imgUser" 
            @click="dialogImg = true" 
            color="#EEEEEE" 
            size="200"
        >
            <img id="imgUserId" :src="imgUrl" alt="" loading="lazy">
        </v-avatar>
        <label for="inputNomId" class="labelNom">NOMBRE</label>
        <v-text-field v-model="user.nom" class="inputNom" id="inputNomId" type="text" :label="mobile ? 'Nombre' : ''"></v-text-field>
        <label for="inputApesId" class="labelApes">APELLIDOS</label>
        <v-text-field v-model="user.ape" class="inputApes" id="inputApesId" type="text" :label="mobile ? 'Apellidos' : ''"></v-text-field>
        <label for="radioSexId" class="labelSex">GENERO</label>
        <v-radio-group row v-model="user.sexo" class="radioSex" id="radioSexId">
            <v-radio :value="false" id="radioHombre" color="blue-grey darken-4">
                <template slot="label">
                    <v-icon class="mr-2">fas fa-male</v-icon>Hombre
                </template>
            </v-radio>
            <v-radio :value="true" id="radioMujer" color="blue-grey darken-4">
                <template slot="label">
                    <v-icon class="mr-2">fas fa-female</v-icon>Mujer
                </template>
            </v-radio>
        </v-radio-group>
        <label for="selectNacionalidadId" class="labelSelectNacionalidades">LUGAR DE NACIMIENTO</label>
        <v-select
            id="selectNacionalidadId"
            class="selectNacionalidades"
            label="Lugar nacimiento"
            prepend-icon="map"
            v-model="user.nacionalidad"
            :items="nationalities"
            solo
        ></v-select>
        <label for="calendarFechaNacId" class="labelCalendarFechaNac">FECHA DE NACIMIENTO</label>
        <div class="calendarFechaNac">
            <v-menu
                id="calendarFechaNacId"
                ref="menuPicker"
                v-model="menuPicker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="datePicker"
                lazy
                transition="scale-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="datePicker"
                        label="Fecha de nacimiento"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="datePicker"
                    no-title
                    scrollable
                    :max="new Date().toISOString().substr(0, 10)"
                >
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-3" @click="menuPicker = false">CANCELAR</v-btn>
                    <v-btn flat color="grey darken-3" @click="$refs.menuPicker.save(datePicker)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </div>
        <label for="inputGuitarraId" class="labelinputGuitarra">GUITARRA ACTUAL</label>
        <v-text-field v-model="user.guitarra" class="inputGuitarra" id="inputGuitarraId" type="text" :label="mobile ? 'Guitarra' : ''"></v-text-field>
        <label for="inputBiografiaId" class="labelinputBiografia">BIOGRAFÍA</label>
        <v-textarea
            v-model="user.biografia"
            id="inputBiografiaId"
            class="inputBiografia"
            box
            auto-grow
        ></v-textarea>

        <label for="inputWebPageId" class="labelWebPage">PÁGINA WEB</label>
        <v-text-field v-model="user.webpage" class="inputWebPage" id="inputWebPageId" type="text" :label="mobile ? 'Página web' : ''" placeholder="https://mi-pagina-web.com"></v-text-field>

        <label for="inputRedesId" class="labelRedes">REDES SOCIALES</label>
        <v-dialog v-model="dialogRedes" persistent max-width="400">
            <v-card>
                <v-card-title class="headline">Indique el enlace para ver el perfil de su red</v-card-title>
                <v-card-text>
                    <v-text-field type="text" v-model="enlaceRed" label="Enlace" placeholder="https://..."></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-3" @click="cancelAddRed">cancelar</v-btn>
                    <v-btn flat color="grey darken-3" @click="addEnlaceRed">aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-select
            v-model="userRedes"
            :items="itemsRedes"
            label="Selecciona tus redes sociales"
            id="inputRedesId"
            class="inputRedes"
            multiple
            chips
            solo
            return-object
            @input="dialogRedes = true"
        >
            <template slot="item" slot-scope="data">
                <v-icon class="mr-2" v-show="data.item == 'Facebook'">fab fa-facebook</v-icon>
                <v-icon class="mr-2" v-show="data.item == 'Instagram'">fab fa-instagram</v-icon>
                <v-icon class="mr-2" v-show="data.item == 'Twitter'">fab fa-twitter-square</v-icon>
                <v-icon class="mr-2" v-show="data.item == 'Flickr'">fab fa-flickr</v-icon>
                <v-icon class="mr-2" v-show="data.item == 'Snapchat'">fab fa-snapchat-square</v-icon>
                <v-icon class="mr-2" v-show="data.item == 'Tumblr'">fab fa-tumblr-square</v-icon>
                {{ data.item }}
            </template>
        </v-select>
        <v-btn 
            :loading="loading" 
            :disabled="loading" 
            :dark="!loading" 
            @click="updateUser" 
            color="green darken-3" 
            id="btnUpdate"
        >
            <v-icon class="mr-3">fas fa-save</v-icon>
            guardar
        </v-btn>
    
        <v-dialog v-model="dialogAlertUserUpdated" persistent max-width="500">
            <v-card class="cardDialogAlertUserUpdated">
                <p class="subheading">Perfil actualizado correctamente</p>
                <v-btn block dark color="blue darken-3" @click="afterUserUpdated">aceptar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAlertImageUpdated" persistent max-width="500">
            <v-card class="cardDialogAlertUserUpdated">
                <p class="subheading">Imagen de perfil actualizada correctamente</p>
                <v-btn block dark color="blue darken-3" @click="dialogAlertImageUpdated = false">aceptar</v-btn>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapGetters } from 'vuex'

export default {
    name: 'edit-perfil',
    data () {
        return {
            user: {
                nom: null,
                ape: null,
                sexo: null,
                nacionalidad: 'España',
                guitarra: null,
                biografia: null,
                webpage: null
            },
            userRedes: [],
            userRedesObjects: [],
            nationalities: require('../assets/paises.js'),
            breakpoint: this.$vuetify.breakpoint,
            datePicker: this.getDatePicker,
            menuPicker: false,
            loading: false,
            dialogImg: false,
            dialogRedes: false,
            croppa: {},
            imgUrl: '',
            mobile: true,
            itemsRedes: ['Facebook', 'Instagram', 'Twitter', 'Flickr', 'Snapchat', 'Tumblr'],
            enlaceRed: null,
            dialogAlertUserUpdated: false,
            dialogAlertImageUpdated: false
        }
    },
    watch: {
        userRedes(newValue, prevValue) {
            if (newValue.length < prevValue.length) {
                this.dialogRedes = false
            }

            let self = this
            let redesObjects = newValue.map(r => {
                return { red: r, link: self.getLinkRed(r) }
            })

            this.userRedesObjects = redesObjects
        },
    },
    created() {
        axios.defaults.headers.common['token'] = this.$store.state.token
        this.getUser()
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    },
    computed: {
        ...mapGetters(['userLoginStore']),
        getDatePicker () {
            return new Date().toISOString().substr(0, 10)
        }
    },
    methods: {
        updateUser() {
            this.loading = true

            let nombre = this.user.nom
            let apellidos = this.user.ape
            let nacionalidad = this.user.nacionalidad
            let sexo = this.user.sexo
            let fechaNac = this.datePicker
            let guitarra = this.user.guitarra
            let biografia = this.user.biografia
            let redes = JSON.stringify(this.userRedesObjects)
            let webpage = this.user.webpage

            let updatedUser = {
                nombre,
                apellidos,
                sexo,
                nacionalidad,
                fechaNac,
                guitarra,
                biografia,
                redes,
                webpage
            }

            console.log(updatedUser)

            axios.put(`${ this.$store.state.urlBackend }/usuarios/${ this.userLoginStore._id }`, qs.stringify(updatedUser))
                .then((res) => { 
                    console.log('Updated ok', res)
                    this.loading = false
                    this.dialogAlertUserUpdated = true
                })
                .catch((err) => { 
                    console.log(err)
                    this.loading = false
                })
        },
        getUser() {
            axios.get(`${ this.$store.state.urlBackend }/usuarios/${ this.userLoginStore._id }`)
                .then((res) => {
                    console.log(res.data.usuario)
                    this.fillDataUser(res.data.usuario)
                })
                .catch((err) => {
                    console.log(err.data)
                })
        },
        fillDataUser(user) {
            this.user.nom = user.nombre
            this.user.ape = user.apellidos
            this.user.sexo = user.sexo
            this.user.nacionalidad = user.nacionalidad
            this.datePicker = user.fechaNac.substr(0, 10)
            this.user.guitarra = user.guitarra
            this.user.biografia = user.biografia

            let self = this
            this.$store.dispatch('getImage', user.img)
                .then(img => self.imgUrl = img)
                .catch(err => console.log('ERROR getImage Edit-perfil.vue', err))

            this.getUserRedes(user)
            this.user.webpage = user.webpage
        },
        croppaChoseFile() {
            this.croppa.chooseFile()
        },
        generateImage() {
            this.dialogImg = false

            this.croppa.generateBlob((blob) => {
                this.imgUrl = blob
                this.subirImagenUsuario()
                this.imgUrl = URL.createObjectURL(blob)
            })
        },
        subirImagenUsuario() {
            let bodyFormData = new FormData()
            bodyFormData.append('archivo', this.imgUrl)

            axios({
                method: 'put',
                url: `${ this.$store.state.urlBackend }/uploads/imgusuarios/${ this.userLoginStore._id }`,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then((res) => {
                    this.dialogAlertImageUpdated = true
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        addEnlaceRed() {
            if (this.enlaceRed !== '' || this.enlaceRed !== null) {
                this.userRedesObjects[this.userRedesObjects.length - 1].link = this.enlaceRed
            }
            this.enlaceRed = null
            this.dialogRedes = false
        },
        getUserRedes(user) {
            let redes = user.redes.map(r => r.red)            
            this.userRedes = redes
            this.userRedesObjects = user.redes
        },
        getLinkRed(red) {
            let res = '';

            for (let i = 0; i < this.userRedesObjects.length; i++) {
                if (this.userRedesObjects[i].red === red) {
                    res = this.userRedesObjects[i].link
                }
            }

            return res
        },
        cancelAddRed() {
            this.userRedes.pop()
            this.dialogRedes = false
        },
        afterUserUpdated() {
            this.$router.push(`/perfil/${ this.userLoginStore._id }`) 
        }
    }
}
</script>

<style scoped>
    .containerGrid {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template:
        'imgUser imgUser imgUser'
        'imgUser imgUser imgUser'
        'inputNom inputNom inputNom'
        'inputApes inputApes inputApes'
        'radioSex radioSex radioSex'
        'selectNacionalidades selectNacionalidades selectNacionalidades'
        'calendarFechaNac calendarFechaNac calendarFechaNac'
        'inputGuitarra inputGuitarra inputGuitarra'
        'labelinputBiografia labelinputBiografia labelinputBiografia'
        'inputBiografia inputBiografia inputBiografia'
        'inputWebPage inputWebPage inputWebPage'
        'inputRedes inputRedes inputRedes'
        'btnUpdate btnUpdate btnUpdate';
    }
    .imgUser {
        grid-area: imgUser;
        justify-self: center;
        cursor: pointer;
        margin-bottom: 2rem;
    }
    .labelNom {
        display: none;
        grid-area: labelNom;
    }
    .inputNom {
        grid-area: inputNom;
    }
    .labelApes {
        display: none;
        grid-area: labelApes;
    }
    .inputApes {
        grid-area: inputApes;
    }
    .labelSex {
        display: none;
        grid-area: labelSex;
    }
    .radioSex {
        grid-area: radioSex;
        justify-self: start;
    }
    .labelSelectNacionalidades {
        display: none;
        grid-area: labelSelectNacionalidades;
    }
    .selectNacionalidades {
        grid-area: selectNacionalidades;
    }
    .labelCalendarFechaNac {
        display: none;
        grid-area: labelCalendarFechaNac;
    }
    .calendarFechaNac {
        grid-area: calendarFechaNac;
    }
    .labelinputGuitarra {
        display: none;
        grid-area: labelinputGuitarra;
    }
    .inputGuitarra {
        grid-area: inputGuitarra;
    }
    .labelinputBiografia {
        margin-top: 2rem;
        grid-area: labelinputBiografia;
        text-align: center;
    }
    .inputBiografia {
        grid-area: inputBiografia;
    }
    .labelRedes {
        display: none;
        grid-area: labelRedes;
    }
    .inputRedes {
        grid-area: inputRedes;
    }
    .labelWebPage {
        display: none;
        grid-area: labelWebPage
    }
    .inputWebPage {
        grid-area: inputWebPage
    }
    #btnUpdate {
        grid-area: btnUpdate
    }
    .cardDialogAlertUserUpdated {
        padding: 2rem;
    }

    @media (min-width: 960px) {
        .containerGrid {
            grid-gap: 0.9rem;
            grid-template:
            'imgUser imgUser imgUser imgUser imgUser'
            'imgUser imgUser imgUser imgUser imgUser'
            'labelNom inputNom inputNom ....... .......'
            'labelApes inputApes inputApes ....... .......'
            'labelSex radioSex radioSex ....... .......'
            'labelSelectNacionalidades selectNacionalidades ....... ....... .......'
            'labelCalendarFechaNac calendarFechaNac calendarFechaNac ....... .......'
            'labelinputGuitarra inputGuitarra inputGuitarra ....... .......'
            'labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia'
            'inputBiografia inputBiografia inputBiografia inputBiografia inputBiografia'
            'labelWebPage inputWebPage inputWebPage inputWebPage .......'
            'labelRedes inputRedes inputRedes inputRedes .......'
            '....... ....... btnUpdate btnUpdate btnUpdate';
        }
        .labelNom, .labelApes, .labelSex, .labelSelectNacionalidades, .labelCalendarFechaNac, .labelinputGuitarra, .labelRedes, .labelWebPage {
            display: inline-block;
            align-self: center;
            text-align: right;
            margin-right: 8rem;
        }
        .labelinputBiografia {
            align-self: center;
            text-align: center;
        }
        .imgUser {
            justify-self: start;
        }
    }
</style>
