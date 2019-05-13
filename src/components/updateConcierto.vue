<template>
    <v-card>
        <v-toolbar dark color="blue-grey darken-4" id="toolbarAddConcierto">
            <v-spacer></v-spacer>
            <v-toolbar-items>
            <v-btn dark @click="cancelDialogUpdateConciertoEvent" color="blue-grey darken-3">cancelar</v-btn>
            <v-btn 
              @click="putConcierto" 
              color="green darken-3" 
              :disabled="loading"  
              :loading="loading"
              :dark="!loading" 
            >
                <v-icon class="mr-2">fas fa-save</v-icon>
                guardar
            </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-dialog v-model="dialogImg" color="grey lighten-3" max-width="500">
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
                :width="500"
                :height="200"
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

        <div class="containerGridUpdateConcierto">
            <label for="inputImagenId" class="label font-weight-medium">IMAGEN</label>
            <div class="input divImg" @click="dialogImg = true" :class="concierto.img ? 'imgSelected' : 'elevation-10'">
              <p v-show="!concierto.img" style="margin: auto; display: inline-block">Haga clic aquí y seleccione una imagen 📷</p>
              <img v-show="concierto.img" :src="concierto.img" alt="imagen concierto">
            </div>

            <label for="inputTituloId" class="label font-weight-medium">TITULO</label>
            <v-text-field 
            id="inputTituloId" 
            v-model="concierto.titulo" 
            class="input" 
            type="text" 
            :counter="counters.titulo"
            :error-messages="msgsErrors.titulo"
            :label="mobile ? 'Titulo' : ''">
            </v-text-field>

            <label for="inputDescripcionId" class="label font-weight-medium">DESCRIPCIÓN</label>
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
        
            <label for="calendarFechaId" class="label font-weight-medium">FECHA</label>            
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
              color="blue-grey darken-3"
              >
                  <v-spacer></v-spacer>
                  <v-btn flat color="grey darken-3" @click="menuFecha = false">CANCELAR</v-btn>
                  <v-btn flat color="grey darken-3" @click="$refs.menuFecha.save(dateCalendar)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <label for="inputHoraId" class="label font-weight-medium">HORA</label>
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
              color="blue-grey darken-3"
              ></v-time-picker>
            </v-menu>

            <label for="inputPrecioId" class="label font-weight-medium">PRECIO</label>
            <v-text-field 
            id="inputPrecioId" 
            v-model="concierto.precio" 
            class="inputPrecio" 
            type="number" 
            :error-messages="msgsErrors.precio"
            :label="mobile ? 'Precio' : ''">
            </v-text-field>

            <label for="inputUbicacionId" class="label font-weight-medium">UBICACIÓN</label>
            <v-text-field 
            id="inputUbicacionId" 
            v-model="concierto.ubicacion" 
            class="input" 
            type="text"
            :counter="counters.ubicacion"
            :error-messages="msgsErrors.ubicacion"
            :label="mobile ? 'Ubicación' : ''">
            </v-text-field>

            <label for="selectProgramaId" class="label font-weight-medium">PROGRAMA</label>
            <v-select 
            solo 
            clearable
            id="selectProgramaId" 
            v-model="programa"
            :items="programas"
            item-text="nombre"
            item-value="_id"
            class="selectPrograma" 
            type="text" 
            :error-messages="msgsErrors.programa"
            label="Seleccione un programa"
            >
            </v-select>

            <div class="btnAddPrograma">
              <v-btn dark small fab color="blue-grey darken-3" @click="viewPrograma" :loading="loadingPreview" id="" class=""><v-icon>fas fa-eye</v-icon></v-btn>
              <v-btn dark color="blue darken-3" @click="dialogPrograma = true" id="btnAddProgramaId" class=""><v-icon class="mr-2">add</v-icon> AÑADIR PROGRAMA</v-btn>
            </div>

            <v-dialog v-model="dialogVistaPreviaPrograma">
              <previewprograma
              :obrasObj="obrasObj"
              ></previewprograma>
            </v-dialog>

            <v-dialog v-model="dialogPrograma" persistent max-width="800">
              <addPrograma 
                @closeProgramEvent="dialogPrograma = false"
                @programSavedEvent="programSaved"
              ></addPrograma>
            </v-dialog>

            <v-dialog v-model="dialogConciertoActualizado" persistent max-width="500">
              <v-card class="dialogConciertoActualizado" color="grey lighten-3">
                <p class="subheading">Concierto actualizado correctamente</p>
                <v-btn block dark color="blue darken-3" @click="closeDialogUpdateConciertoEvent">aceptar</v-btn>
              </v-card>
            </v-dialog>
            
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapState, mapGetters } from 'vuex'
import addPrograma from '../components/addPrograma'
import previewprograma from '../components/previewPrograma'
import { constants } from 'crypto'

export default {
  name: 'updateConcierto',
  components: { addPrograma, previewprograma },
  props: ['conciertoObj'],
  data() {
    return {
      concierto: {
        titulo: this.conciertoObj.titulo,
        descripcion: this.conciertoObj.descripcion,
        hora: this.conciertoObj.hora,
        precio: this.conciertoObj.precio,
        ubicacion: this.conciertoObj.ubicacion,
        usuarioId: this.conciertoObj.usuario._id,
        programa: null,
        img: this.conciertoObj.img
      },
      programa: this.conciertoObj.programa,
      dialogPrograma: false,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      menuFecha: false,
      dateCalendar: new Date(this.conciertoObj.fecha).toISOString().substr(0, 10),
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
        hora: null,
        programa: null
      },
      dialogConciertoActualizado: false,
      loading: false,
      dialogVistaPreviaPrograma: false,
      obrasObj: null,
      loadingPreview: false,
      dialogImg: false,
      croppa: {},
      imgUrlToUpload: this.conciertoObj.img
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
    closeDialogUpdateConciertoEvent() {
      this.$emit('closeDialogUpdateConciertoEvent', true)
    },
    cancelDialogUpdateConciertoEvent() {
      this.$emit('cancelDialogUpdateConciertoEvent', true)
    },
    programSaved() {
      this.getProgramas()
    },
    getProgramas() {
      if (!this.login) { return }
      if (this.paramId === undefined) { return }
      
      axios.get(`${ this.$store.state.urlBackend }/programas/usuarios/${ this.userLoginStore._id }`)
        .then((res) => {
          let programasDB = res.data.programas
          this.programas = programasDB
          // if (programasDB.length > 0) {
          //   this.concierto.programa = programasDB[programasDB.length - 1]
          // }
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
      // this.msgsErrors.programa = null
      let errorTitulo = false,
      errorDescripcion = false,
      errorUbicacion = false,
      errorPrecio = false,
      errorFecha = false,
      errorHora = false
      // errorPrograma = false

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
      // if (this.programa === undefined) {
      //   this.msgsErrors.programa = 'Seleccione un programa para el concierto'
      //   errorPrograma = true
      // }

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
    putConcierto() {
      if (this.validaciones()) {
        this.loading = true

        let programa
        typeof this.programa === 'object' ? programa = this.programa._id : programa = this.programa

        let conciertoUpdated
        conciertoUpdated = {
          titulo: this.concierto.titulo,
          descripcion: this.concierto.descripcion,
          fecha: this.dateCalendar,
          hora: this.concierto.hora,
          precio: this.concierto.precio,
          ubicacion: this.concierto.ubicacion,
          usuario: this.userLoginStore._id,
          programa,
          img: this.concierto.img
        }

        axios.put(`${ this.$store.state.urlBackend }/conciertos/${ this.conciertoObj._id }`, qs.stringify(conciertoUpdated))
          .then((res) => {
            this.dialogConciertoActualizado = true
            this.loading = false
          })
          .catch((err) => {
            console.log(err.response)
            this.loading = false
          })
      }
    },    
    viewPrograma() {
      if (this.programa === null || this.programa === undefined || this.programa === '') { return }
      if (!this.login) { return }
      if (this.paramId === undefined) { return }

      this.loadingPreview = true

      let programa
      typeof this.programa === 'object' ? programa = this.programa._id : programa = this.programa
      
      axios.get(`${ this.$store.state.urlBackend }/programas/${ programa }`)
        .then((res) => {
          console.log(res)
          this.obrasObj = res.data.programa.obras
          this.dialogVistaPreviaPrograma = true
          this.loadingPreview = false
        })
        .catch((err) => {
          console.log(err.response)
          this.loadingPreview = false
        })
    },
    croppaChoseFile() {
        this.croppa.chooseFile()
    },
    generateImage() {
      this.dialogImg = false

      this.croppa.generateBlob((blob) => {
        this.setBlobToProperty(blob)
        this.concierto.img = URL.createObjectURL(blob)
        this.subirImagenConcierto(this.conciertoObj._id)
      })
    },
    setBlobToProperty(blob) {
      this.imgUrlToUpload = blob
    },
    subirImagenConcierto(idConcierto) {
        let bodyFormData = new FormData()
        bodyFormData.append('archivo', this.imgUrlToUpload)

        axios({
            method: 'put',
            url: `${ this.$store.state.urlBackend }/uploads/imgconciertos/${ idConcierto }`,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((res) => {
              console.log('res', res)
              this.concierto.img = res.data.img
            })
            .catch((err) => {
              console.log(err.response)
            })
    }
  }
}
</script>

<style scoped>
    .containerGridUpdateConcierto {
      display: grid;
      grid-gap: 1.5rem;
      grid-template-columns: 100fr;
    }
    .containerGridUpdateConcierto {
      padding: 1rem;
    }
    .label {
      display: none;
    }
    #toolbarAddConcierto {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .dialogConciertoActualizado {
      padding: 2rem;
    }
    .btnAddPrograma {
      justify-self: center;
    }
    .divImg {
      width: 100%;
      height: 200px;
      border: 1px solid grey;
      display: grid;
      justify-content: center;
      cursor: pointer;
      border-radius: 0.3rem;
    }
    .imgSelected {
      border: none;
    }
    img {
      width: 100%;
      height: auto;
      border-radius: 0.3rem;
    }

    @media (min-width: 960px) {
        .containerGridUpdateConcierto {
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
        .divImg {
          width: 500px;
        }
    }
</style>
