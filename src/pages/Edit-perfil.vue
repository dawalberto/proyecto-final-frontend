<template>
    <div class="containerGrid">
        <v-avatar class="imgUser" color="brown lighten-1" size="200">
            <img src="http://simpleicon.com/wp-content/uploads/user1.png" alt="avatar">
        </v-avatar>
        <label for="inputNomId" class="labelNom">NOMBRE</label>
        <v-text-field class="inputNom" id="inputNomId" type="text" placeholder="Nombre"></v-text-field>
        <label for="inputApesId" class="labelApes">APELLIDOS</label>
        <v-text-field class="inputApes" id="inputApesId" type="text" placeholder="Apellidos"></v-text-field>
        <label for="radioSexId" class="labelSex">GENERO</label>
        <v-radio-group row class="radioSex" id="radioSexId">
            <v-radio label="HOMBRE" value="false"></v-radio>
            <v-radio label="MUJER" value="true"></v-radio>
        </v-radio-group>
        <label for="selectNacionalidadId" class="labelSelectNacionalidades">NACIONALIDAD</label>
        <v-select
            id="selectNacionalidadId"
            class="selectNacionalidades"
            :items="nacionalidades"
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
        <v-text-field class="inputGuitarra" id="inputGuitarraId" type="text" placeholder="Guitarra"></v-text-field>
        <label for="inputBiografiaId" class="labelinputBiografia">TRAYECTORIA</label>
        <v-textarea
            id="inputBiografiaId"
            class="inputBiografia"
            box
            auto-grow
        ></v-textarea>
    </div>
</template>

<script>
export default {
    name: 'perfil',
    data () {
        return {
            nacionalidades: ['Español', 'Argentino'],
            landscape: true,
            breakpoint: this.$vuetify.breakpoint,
            datePicker: this.getDatePicker,
            menuPicker: false
        }
    },
    mounted () {
        this.breakpoint.smAndDown ? this.landscape = false : this.landscape = true
    },
    computed: {
        getDatePicker () {
            return new Date().toISOString().substr(0, 10)
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
        'inputBiografia inputBiografia inputBiografia inputBiografia inputBiografia';
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
        grid-area: labelinputBiografia;
        text-align: center;
    }
    .inputBiografia {
        grid-area: inputBiografia;
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
            'labelinputBiografia ....... ....... ....... .......'
            'inputBiografia inputBiografia inputBiografia inputBiografia inputBiografia';
        }
        .labelNom, .labelApes, .labelSex, .labelSelectNacionalidades, .labelCalendarFechaNac, .labelinputGuitarra, .labelinputBiografia {
            display: inline-block;
            align-self: center;
            text-align: right;
            margin-right: 8rem;
        }
    }
</style>
