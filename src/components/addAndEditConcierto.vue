<template>
    <v-card>
        <v-toolbar dark color="grey darken-3">
            <v-btn icon dark @click="closeDialogCreateConciertoEvent">
            <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            <v-btn dark flat @click="closeDialogCreateConciertoEvent">cancelar</v-btn>
            <v-btn dark flat>guardar</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <div class="containerGridCreateConcierto">
            <label for="inputTituloId" class="label">TITULO</label>
            <v-text-field id="inputTituloId" v-model="concierto.titulo" class="input" type="text" :label="mobile ? 'Titulo' : ''"></v-text-field>

            <label for="inputDescripcionId" class="label">DESCRIPCIÓN</label>
            <v-textarea id="inputDescripcionId" v-model="concierto.descripcion" class="input" solo no-resize :label="mobile ? 'Descripción' : ''"></v-textarea>
        
            <label for="calendarFechaId" class="label">FECHA</label>            
            <v-menu
                id="calendarFechaId"
                class="input"
                ref="menuFecha"
                v-model="menuFecha"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="dateCalendar"
                lazy
                transition="scale-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="dateCalendar"
                        label="Fecha del concierto"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                v-model="dateCalendar"
                no-title
                scrollable
                :min="new Date().toISOString().substr(0, 10)"
                >
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-3" @click="menuFecha = false">CANCELAR</v-btn>
                    <v-btn flat color="grey darken-3" @click="$refs.menuFecha.save(dateCalendar)">OK</v-btn>
                </v-date-picker>
            </v-menu>

            <label for="inputHoraId" class="label">HORA</label>
            <v-menu
            id="inputHoraId"
            class="inputHora"
            ref="menu"
            v-model="menuHora"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="concierto.hora"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="350px"
            min-width="350px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="concierto.hora"
                    label="Hora"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    v-if="menuHora"
                    v-model="concierto.hora"
                    full-width
                    @click:minute="$refs.menu.save(concierto.hora)"
                ></v-time-picker>
            </v-menu>

            <label for="inputPrecioId" class="label">PRECIO</label>
            <v-text-field id="inputPrecioId" v-model="concierto.precio" class="inputPrecio" type="number" :label="mobile ? 'Precio' : ''"></v-text-field>

            <label for="inputUbicacionId" class="label">UBICACIÓN</label>
            <v-text-field id="inputUbicacionId" v-model="concierto.ubicacion" class="input" type="text" :label="mobile ? 'Ubicación' : ''"></v-text-field>

            <label for="selectProgramaId" class="label">PROGRAMA</label>
            <v-select 
              solo 
              id="selectProgramaId" 
              v-model="concierto.programa"
              :items="programas"
              item-text="nombre"
              item-value="_id"
              class="selectPrograma" 
              type="text" 
              :label="mobile ? 'Programa' : ''"
            >
            </v-select>
            <v-btn block dark color="grey darken-3" @click="dialogPrograma = true" id="btnAddProgramaId" class="btnAddPrograma"><v-icon class="mr-2">add</v-icon> AÑADIR PROGRAMA</v-btn>

            <v-dialog v-model="dialogPrograma" persistent max-width="800" color="red">
                <programa 
                    @closeProgramEvent="dialogPrograma = false"
                    @programSavedEvent="programSaved"
                ></programa>
            </v-dialog>
            
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import programa from '../components/programa'

    export default {
        name: 'addAndEditConcierto',
        components: { programa },
  data() {
    return {
      conciertos: [],
      concierto: {
        titulo: null,
        descripcion: null,
        hora: null,
        precio: null,
        ubicacion: null,
        usuarioId: null,
        programa: null
      },
      dialogPrograma: false,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      menuFecha: false,
      dateCalendar: this.getDateCalendar,
      menuHora: false,
      programas: []
    }
  },
  mounted() {
    this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    this.getProgramas()
  },
  computed: {
    ...mapState(['login']),
    ...mapGetters(['userLoginStore']),
    getDateCalendar () {
        return new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
      closeDialogCreateConciertoEvent() {
          this.$emit('closeDialogCreateConciertoEvent', true)
      },
      programSaved() {
        console.log('PROGRAM SAVED EVENT')
        this.getProgramas()
      },
      getProgramas() {

        if (!this.login) { return }
        
        let self = this
        axios.get(`${ this.$store.state.urlBackend }/programas/usuarios/${ this.userLoginStore._id }`)
          .then((res) => {
            self.programas = res.data.programas
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
  },
}
</script>

<style scoped>
    .containerGridCreateConcierto {
      display: grid;
      grid-gap: 1.5rem;
      grid-template-columns: 100fr;
    }
    .containerGridCreateConcierto {
      padding: 1rem;
    }
    .label {
      display: none;
    }

    @media (min-width: 960px) {
        .containerGridCreateConcierto {
          grid-template-columns: 25fr 35fr 40fr;
          padding: 3rem;
          margin-left: 10rem;
          margin-right: 10rem;
        }
        .label {
          grid-column: 1;
          justify-self: center;
          align-self: center;
          display: inline;
        }
        .input {
          grid-column: 2 / 4;
        }
        .inputPrecio, .inputHora {
          grid-column: 2 / 3;
        }
        .selectPrograma {
          grid-column: 2 / 3;
        }
        .btnAddPrograma {
          grid-column: 3 / 4;
        }
    }
</style>
