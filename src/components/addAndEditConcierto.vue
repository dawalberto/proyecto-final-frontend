<template>
    <v-card>
        <v-toolbar dark color="grey darken-3" id="toolbarAddAndEditConcierto">
            <v-spacer></v-spacer>
            <v-toolbar-items>
            <v-btn dark flat @click="closeDialogCreateConciertoEvent">cancelar</v-btn>
            <v-btn dark @click="postConcierto" color="blue darken-3" :disable="loading" :loading="loading"><v-icon class="mr-2">fas fa-save</v-icon> guardar</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <div class="containerGridCreateConcierto">
            <label for="inputTituloId" class="label">TITULO</label>
            <v-text-field 
            id="inputTituloId" 
            v-model="concierto.titulo" 
            class="input" 
            type="text" 
            :counter="counters.titulo"
            :error-messages="msgsErrors.titulo"
            :label="mobile ? 'Titulo' : ''">
            </v-text-field>

            <label for="inputDescripcionId" class="label">DESCRIPCIÓN</label>
            <v-textarea 
            id="inputDescripcionId" 
            v-model="concierto.descripcion" 
            class="input" 
            solo 
            no-resize 
            :counter="counters.descripcion"
            :error-messages="msgsErrors.descripcion"
            :label="mobile ? 'Descripción' : ''">
            </v-textarea>
        
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
                :error-messages="msgsErrors.fecha"
                label="Fecha del concierto"
                prepend-icon="event"
                readonly
                v-on="on">
                </v-text-field>
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
                :error-messages="msgsErrors.hora"
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
            <v-text-field 
            id="inputPrecioId" 
            v-model="concierto.precio" 
            class="inputPrecio" 
            type="number" 
            :error-messages="msgsErrors.precio"
            :label="mobile ? 'Precio' : ''">
            </v-text-field>

            <label for="inputUbicacionId" class="label">UBICACIÓN</label>
            <v-text-field 
            id="inputUbicacionId" 
            v-model="concierto.ubicacion" 
            class="input" 
            type="text"
            :counter="counters.ubicacion"
            :error-messages="msgsErrors.ubicacion"
            :label="mobile ? 'Ubicación' : ''">
            </v-text-field>

            <label for="selectProgramaId" class="label">PROGRAMA</label>
            <v-select 
            solo 
            clearable
            id="selectProgramaId" 
            v-model="concierto.programa"
            :items="programas"
            item-text="nombre"
            item-value="_id"
            class="selectPrograma" 
            type="text" 
            label="Seleccione un programa"
            >
            </v-select>
            <v-btn block dark color="grey darken-3" @click="dialogPrograma = true" id="btnAddProgramaId" class="btnAddPrograma"><v-icon class="mr-2">add</v-icon> AÑADIR PROGRAMA</v-btn>

            <v-dialog v-model="dialogPrograma" persistent max-width="800" color="red">
              <programa 
                @closeProgramEvent="dialogPrograma = false"
                @programSavedEvent="programSaved"
              ></programa>
            </v-dialog>

            <v-dialog v-model="dialogConciertoAgregado" persistent max-width="500">
              <v-card class="dialogConciertoAgregado" dark color="green darken-3">
                <p>Concierto creado correctamente</p>
                <v-btn block color="grey darken-3" @click="closeDialogCreateConciertoEvent">aceptar</v-btn>
              </v-card>
            </v-dialog>
            
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
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
        precio: 0,
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
      programas: [],
      paramId: this.$route.params.id,
      counters: {
        titulo: 35,
        descripcion: 455,
        ubicacion: 55,
      },
      msgsErrors: {
        titulo: null,
        descripcion: null,
        ubicacion: null,
        precio: null,
        fecha: null,
        hora: null
      },
      dialogConciertoAgregado: false,
      loading: false
    }
  },
  mounted() {
    this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    this.getProgramas()
    console.log('this.$route', this.$route)
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
      this.getProgramas()
    },
    getProgramas() {
      if (!this.login) { return }
      if (this.paramId === undefined) { return }
      
      let self = this
      axios.get(`${ this.$store.state.urlBackend }/programas/usuarios/${ this.userLoginStore._id }`)
        .then((res) => {
          let programasDB = res.data.programas
          self.programas = programasDB
          if (programasDB.length > 0) {
            self.concierto.programa = programasDB[0]
          }
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    validaciones() {
      this.msgsErrors.titulo = null
      this.msgsErrors.descripcion = null
      this.msgsErrors.ubicacion = null
      this.msgsErrors.precio = null
      this.msgsErrors.fecha = null
      this.msgsErrors.hora = null
      let errorTitulo = false,
      errorDescripcion = false,
      errorUbicacion = false,
      errorPrecio = false,
      errorFecha = false,
      errorHora = false

      // Validaciones
      if (this.concierto.titulo === null || this.concierto.titulo === undefined || this.concierto.titulo === '') {
        this.msgsErrors.titulo = 'El título es obligatorio'
        errorTitulo = true
      }
      if (this.concierto.descripcion === null || this.concierto.descripcion === undefined || this.concierto.descripcion === '') {
        this.msgsErrors.descripcion = 'La descripción es obligatoria'
        errorDescripcion = true
      }
      if (this.concierto.ubicacion === null || this.concierto.ubicacion === undefined || this.concierto.ubicacion === '') {
        this.msgsErrors.ubicacion = 'La ubicación es obligatoria'
        errorUbicacion = true
      }
      if (this.concierto.precio === null || this.concierto.precio === undefined || this.concierto.precio === '') {
        this.msgsErrors.precio = 'El precio es obligatorio'
        errorPrecio = true
      }
      if (this.dateCalendar === null || this.dateCalendar === undefined || this.dateCalendar === '') {
        this.msgsErrors.fecha = 'La fecha es obligatoria'
        errorFecha = true
      }
      if (this.concierto.hora === null || this.concierto.hora === undefined || this.concierto.hora === '') {
        this.msgsErrors.hora = 'La hora es obligatoria'
        errorHora = true
      }

      if (errorTitulo || errorDescripcion || errorUbicacion || errorPrecio || errorFecha || errorHora) { return false }

      if (this.concierto.titulo.length > this.counters.titulo) {
        this.msgsErrors.titulo = `La longitud del título supera los ${ this.counters.titulo } caracteres`
        errorTitulo = true
      }
      if (this.concierto.descripcion.length > this.counters.descripcion) {
        this.msgsErrors.descripcion = `La longitud de la descripción no puede superar los ${ this.counters.descripcion } caracteres`
        errorDescripcion = true
      }
      if (this.concierto.ubicacion.length > this.counters.ubicacion) {
        this.msgsErrors.ubicacion = `La longitud de la ubicación no puede superar los ${ this.counters.ubicacion } caracteres`
        errorUbicacion = true
      }

      if (errorTitulo || errorDescripcion || errorUbicacion) { return false }

      return true
    },
    postConcierto() {
      if (this.validaciones()) {
        this.loading = true

        let programa
        typeof this.concierto.programa === 'object' ? programa = this.concierto.programa._id : programa = this.concierto.programa

        let newConcierto = {
          titulo: this.concierto.titulo,
          descripcion: this.concierto.descripcion,
          fecha: this.dateCalendar,
          hora: this.concierto.hora,
          precio: this.concierto.precio,
          ubicacion: this.concierto.ubicacion,
          usuario: this.userLoginStore._id,
          programa,
        }
        console.log(newConcierto)

        let self = this
        axios.post(`${ this.$store.state.urlBackend }/conciertos`, qs.stringify(newConcierto))
          .then((res) => {
            self.clearDataConcierto()
            self.dialogConciertoAgregado = true
            self.loading = false
          })
          .catch((err) => {
            console.log(err.response)
            self.loading = false
          })
      }
    },
    clearDataConcierto() {
      this.concierto.titulo = null
      this.concierto.descripcion = null
      this.dateCalendar = this.getDateCalendar
      this.concierto.hora = null
      this.concierto.precio = 0
      this.concierto.ubicacion = null
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
    #toolbarAddAndEditConcierto {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .dialogConciertoAgregado {
      padding: 2rem;
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
