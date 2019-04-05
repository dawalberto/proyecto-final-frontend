<template>
    <div class="containerGrid">
        <v-avatar class="imgUser" color="brown lighten-1" size="200">
            <img id="imgUserId" src="http://simpleicon.com/wp-content/uploads/user1.png" alt="avatar">
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
        <v-btn @click="updateUser" dark color="grey darken-3" id="btnUpdate"><v-icon class="mr-3">fas fa-edit</v-icon>EDITAR</v-btn>
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
            menuPicker: false
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
            // let img = document.querySelector('#imgUserId').value
            let nombre = this.user.nom
            let apellidos = this.user.ape
            let nacionalidad = this.user.nacionalidad
            let sexo = this.user.sexo
            let fechaNac = this.datePicker
            let guitarra = this.user.guitarra
            let biografia = this.user.biografia

            let updatedUser = {
                // img,
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
                    // eslint-disable-next-line
                    console.log('updated ok', res)
                })
                .catch((err) => { 
                    // eslint-disable-next-line
                    console.log(err)
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
            // document.querySelector('#imgUserId').value
            this.user.nom = user.nombre
            this.user.ape = user.apellidos
            this.user.sexo = user.sexo
            this.user.nacionalidad = user.nacionalidad
            this.datePicker = user.fechaNac.substr(0, 10)
            this.user.guitarra = user.guitarra
            this.user.biografia = user.biografia
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
