<template>
    <div class="containerGrid">
        <v-dialog v-model="dialog" dark max-width="400">
            <v-card>
                <croppa
                    id="croppaId"
                    v-model="croppa"
                    placeholder="Haz clic aquí para subir una imagen"
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
                    color="light-blue accent-4"
                    flat
                    @click="croppaChoseFile"
                >
                    <v-icon class="mr-3">fas fa-cloud-upload-alt</v-icon> SUBIR
                </v-btn>
                <v-btn
                    color="red"
                    flat
                    @click="dialog = false"
                >
                    CANCELAR
                </v-btn>
                <v-btn
                    color="green accent-4"
                    flat
                    @click="generateImage"
                >
                    ACEPTAR
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-avatar class="imgUser" @click="dialog = true" color="grey darken-3" size="200">
            <img id="imgUserId" :src="imgUrl" alt="">
        </v-avatar>
        <label for="inputNomId" class="labelNom">NOMBRE</label>
        <v-text-field v-model="user.nom" class="inputNom" id="inputNomId" type="text" placeholder="Nombre"></v-text-field>
        <label for="inputApesId" class="labelApes">APELLIDOS</label>
        <v-text-field v-model="user.ape" class="inputApes" id="inputApesId" type="text" placeholder="Apellidos"></v-text-field>
        <label for="radioSexId" class="labelSex">GENERO</label>
        <v-radio-group row v-model="user.sexo" class="radioSex" id="radioSexId">
            <v-radio label="HOMBRE" :value="false" id="radioHombre"></v-radio>
            <v-radio label="MUJER" :value="true" id="radioMujer"></v-radio>
        </v-radio-group>
        <label for="selectNacionalidadId" class="labelSelectNacionalidades">NACIONALIDAD</label>
        <v-select
            id="selectNacionalidadId"
            class="selectNacionalidades"
            label="Nacionalidad"
            prepend-icon="map"
            v-model="user.nacionalidad"
            :items="nationalities"
            solo
        ></v-select>
        <label for="calendarFechaNacId" class="labelCalendarFechaNac">FECHA NACIMIENTO</label>
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
                <v-date-picker v-model="datePicker" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-3" @click="menuPicker = false">CANCELAR</v-btn>
                    <v-btn flat color="grey darken-3" @click="$refs.menuPicker.save(datePicker)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </div>
        <label for="inputGuitarraId" class="labelinputGuitarra">GUITARRA ACTUAL</label>
        <v-text-field v-model="user.guitarra" class="inputGuitarra" id="inputGuitarraId" type="text" placeholder="Guitarra"></v-text-field>
        <label for="inputBiografiaId" class="labelinputBiografia">TRAYECTORIA</label>
        <v-textarea
            v-model="user.biografia"
            id="inputBiografiaId"
            class="inputBiografia"
            box
            auto-grow
        ></v-textarea>
        <v-btn @click="updateUser" :disable="loading" :loading="loading" dark color="grey darken-3" id="btnUpdate"><v-icon class="mr-3">fas fa-edit</v-icon>EDITAR</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'perfil',
    data () {
        return {
            user: {
                nom: '',
                ape: '',
                sexo: '',
                nacionalidad: 'Spanish',
                guitarra: '',
                biografia: ''
            },
            nationalities: require('../assets/nationalities.js'),
            landscape: true,
            breakpoint: this.$vuetify.breakpoint,
            datePicker: this.getDatePicker,
            menuPicker: false,
            loading: false,
            dialog: false,
            croppa: {},
            imgUrl: ''
        }
    },
    created() {
        axios.defaults.headers.common['token'] = this.$store.state.token
        this.getUser()
    },
    mounted() {
        this.breakpoint.smAndDown ? this.landscape = false : this.landscape = true
    },
    computed: {
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

            let updatedUser = {
                nombre,
                apellidos,
                sexo,
                nacionalidad,
                fechaNac,
                guitarra,
                biografia
            }

            console.log(updatedUser)

            axios.put(`${ this.$store.state.urlBackend }/usuarios/${ this.$store.state.user._id }`, qs.stringify(updatedUser))
                .then((res) => { 
                    console.log('Updated ok', res)
                    this.loading = false
                })
                .catch((err) => { 
                    console.log(err)
                    this.loading = false
                })
        },
        getUser() {
            axios.get(`${ this.$store.state.urlBackend }/usuarios/${ this.$store.state.user._id }`)
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
        },
        croppaChoseFile() {
            this.croppa.chooseFile()
        },
        generateImage() {
            this.dialog = false

            this.croppa.generateBlob((blob) => {

                // let url = URL.createObjectURL(blob)
                let url = blob
                console.log(url)
                this.imgUrl = url
                this.subirImagenUsuario()

            })
        },
        subirImagenUsuario() {
            let bodyFormData = new FormData()
            bodyFormData.append('archivo', this.imgUrl)

            // axios.put(`${ this.$store.state.urlBackend }/uploads/imgusuarios/${ this.$store.state.user._id }`, bodyFormData)
            //     .then((res) => { 
            //         console.log('Imagen ok', res)
            //     })
            //     .catch((err) => { 
            //         console.log('Error imagen', err.data)
            //     })

            axios({
                method: 'put',
                url: `${ this.$store.state.urlBackend }/uploads/imgusuarios/${ this.$store.state.user._id }`,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }
}
</script>

<style scoped>
    .containerGrid {
        display: grid;
        grid-template:
        '....... ....... imgUser ....... .......'
        '....... ....... imgUser ....... .......'
        'inputNom inputNom inputNom inputNom inputNom'
        'inputApes inputApes inputApes inputApes inputApes'
        'radioSex radioSex radioSex radioSex radioSex'
        'selectNacionalidades selectNacionalidades selectNacionalidades selectNacionalidades selectNacionalidades'
        'calendarFechaNac calendarFechaNac calendarFechaNac calendarFechaNac calendarFechaNac'
        'inputGuitarra inputGuitarra inputGuitarra inputGuitarra inputGuitarra'
        'labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia'
        'inputBiografia inputBiografia inputBiografia inputBiografia inputBiografia'
        'btnUpdate btnUpdate btnUpdate btnUpdate btnUpdate';
    }
    .imgUser {
        grid-area: imgUser;
        justify-self: center;
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
    #btnUpdate {
        grid-area: btnUpdate
    }

    @media (min-width: 960px) {
        .containerGrid {
            grid-gap: 0.9rem;
            grid-template:
            'imgUser ....... ....... ....... .......'
            'imgUser ....... ....... ....... .......'
            'labelNom inputNom inputNom ....... .......'
            'labelApes inputApes inputApes ....... .......'
            'labelSex radioSex radioSex ....... .......'
            'labelSelectNacionalidades selectNacionalidades ....... ....... .......'
            'labelCalendarFechaNac calendarFechaNac calendarFechaNac ....... .......'
            'labelinputGuitarra inputGuitarra inputGuitarra ....... .......'
            'labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia labelinputBiografia'
            'inputBiografia inputBiografia inputBiografia inputBiografia inputBiografia'
            'btnUpdate ....... ....... ....... .......';
        }
        .labelNom, .labelApes, .labelSex, .labelSelectNacionalidades, .labelCalendarFechaNac, .labelinputGuitarra {
            display: inline-block;
            align-self: center;
            text-align: right;
            margin-right: 8rem;
        }
        .labelinputBiografia {
            align-self: center;
            text-align: center;
        }
    }
</style>
