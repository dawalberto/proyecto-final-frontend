<template>
  <div>
    <p v-show="showMsg">{{ msgNingunConcierto }}</p>
    <div class="containerGrid">
      <previewConcierto
        v-for="c of conciertos"
        :key="c._id"
        :conciertoObj="c"
        :paramId="paramId"
      ></previewConcierto>
      <v-btn
        v-if="showButtonAddConcierto"
        class="mr-5 mb-5"
        absolute
        bottom
        right
        fab
        dark
        @click="dialogCreateConcierto = true"
        color="grey darken-3"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>

    <v-dialog v-model="dialogCreateConcierto" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="grey darken-3">
          <v-btn icon dark @click="dialogCreateConcierto = false">
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>Concierto</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialogCreateConcierto = false">cancelar</v-btn>
            <v-btn dark flat @click="dialogCreateConcierto = false">guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div class="containerGridCreateConcierto">
          <label for="inputTituloId" class="label">TITULO</label>
          <v-text-field id="inputTituloId" v-model="newConcierto.titulo" class="input" type="text" :label="mobile ? 'Titulo' : ''"></v-text-field>

          <label for="inputDescripcionId" class="label">DESCRIPCIÓN</label>
          <v-textarea id="inputDescripcionId" v-model="newConcierto.descripcion" class="input" solo no-resize :label="mobile ? 'Descripción' : ''"></v-textarea>
        
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
            :return-value.sync="newConcierto.hora"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="350px"
            min-width="350px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="newConcierto.hora"
                label="Hora"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuHora"
              v-model="newConcierto.hora"
              full-width
              @click:minute="$refs.menu.save(newConcierto.hora)"
            ></v-time-picker>
          </v-menu>

          <label for="inputPrecioId" class="label">PRECIO</label>
          <v-text-field id="inputPrecioId" v-model="newConcierto.precio" class="inputPrecio" type="number" :label="mobile ? 'Precio' : ''"></v-text-field>

          <label for="inputUbicacionId" class="label">UBICACIÓN</label>
          <v-text-field id="inputUbicacionId" v-model="newConcierto.ubicacion" class="input" type="text" :label="mobile ? 'Ubicación' : ''"></v-text-field>

          <label for="selectProgramaId" class="label">PROGRAMA</label>
          <v-select solo id="selectProgramaId" v-model="newConcierto.programa" class="selectPrograma" type="text" :label="mobile ? 'Programa' : ''"></v-select>
          <v-btn block dark color="grey darken-3" @click="dialogPrograma = true" id="btnAddProgramaId" class="btnAddPrograma"><v-icon class="mr-2">add</v-icon> AÑADIR PROGRAMA</v-btn>

          <v-dialog v-model="dialogPrograma" persistent max-width="800" color="red">
            <programa 
              @closeEvent="dialogPrograma = false"
            ></programa>
          </v-dialog>
            
        </div>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import previewConcierto from '../components/previewConcierto'
import programa from '../components/programa'

export default {
  name: 'conciertos',
  components: { previewConcierto, programa },
  data() {
    return {
      conciertos: [],
      newConcierto: {
        titulo: null,
        descripcion: null,
        hora: null,
        precio: null,
        ubicacion: null,
        usuarioId: null,
        programa: null
      },
      paramId: this.$route.params.id,
      msgNingunConcierto: 'Guitarrista sin conciertos publicados',
      showMsg: false,
      dialogCreateConcierto: false,
      dialogPrograma: false,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      menuFecha: false,
      dateCalendar: this.getDateCalendar,
      menuHora: false
    }
  },
  created() {
    this.getConciertos()
  },
  mounted() {
    this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
  },
  computed: {
    ...mapState(['login']),
    ...mapGetters(['userLoginStore']),
    showButtonAddConcierto() {
      if (this.login && this.paramId === this.userLoginStore._id) {
        return true
      }
      return false
    },
    getDateCalendar () {
        return new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    getConciertos() {
      if (this.paramId) {
        axios.get(`${ this.$store.state.urlBackend }/conciertos/usuarios/${ this.paramId }`)
          .then((res) => {
            if (res.data.ok) {
              this.conciertos = res.data.conciertos
              this.showMsg = false
            } else {
              this.showMsg = true
            }
          })
          .catch((err) => {
            console.log(err.response)
          })
      } else {
        axios.get(`${ this.$store.state.urlBackend }/conciertos`)
          .then((res) => {
            console.log('this.paramId',this.paramId)
            this.conciertos = res.data.conciertos
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
    }
  }
}
</script>

<style scoped>
    .containerGrid, .containerGridCreateConcierto {
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
        .containerGrid {
          grid-template-columns: 33fr 33fr 33fr;
        }
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
