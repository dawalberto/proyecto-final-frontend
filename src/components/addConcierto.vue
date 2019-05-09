<template>
    <v-card>
        <v-toolbar dark color="blue-grey darken-4" id="toolbarAddConcierto">
            <v-spacer></v-spacer>
            <v-toolbar-items>
            <v-btn dark @click="closeDialogCreateConciertoEvent" color="blue-grey darken-3">cancelar</v-btn>
            <v-btn dark @click="postConcierto" color="green darken-3" :disable="loading" :loading="loading"><v-icon class="mr-2">fas fa-save</v-icon>crear</v-btn>
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

        <div class="containerGridCreateConcierto">
            <label for="inputImagenId" class="label font-weight-medium">IMAGEN</label>
            <div class="input divImg" @click="dialogImg = true" :class="imgUrl ? 'imgSelected' : 'elevation-10'">
              <p v-show="!imgUrl" style="margin: auto; display: inline-block">Haga clic aquí y seleccione una foto 📷</p>
              <img v-show="imgUrl" :src="imgUrl" alt="imagen concierto">
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
            v-model="concierto.programa"
            :items="programas"
            item-text="nombre"
            item-value="_id"
            class="selectPrograma" 
            type="text" 
            label="Seleccione un programa"
            >
            </v-select>

            <div class="btnAddPrograma">
                <v-btn dark small fab :loading="loadingPreview" color="blue-grey darken-3" @click="viewPrograma" id="" class=""><v-icon>fas fa-eye</v-icon></v-btn>
                <v-btn dark color="blue darken-3" @click="dialogPrograma = true" id="btnAddProgramaId" class=""><v-icon class="mr-2">add</v-icon> AÑADIR PROGRAMA</v-btn>
            </div>

            <v-dialog v-model="dialogVistaPreviaPrograma">
                <previewprograma
                :obrasObj="obrasObj"
                ></previewprograma>
            </v-dialog>

            <v-dialog v-model="dialogPrograma" persistent max-width="800" color="red">
              <addPrograma 
                @closeProgramEvent="dialogPrograma = false"
                @programSavedEvent="programSaved"
              ></addPrograma>
            </v-dialog>

            <v-dialog v-model="dialogConciertoAgregado" persistent max-width="500">
              <v-card class="dialogConciertoAgregado" color="grey lighten-3">
                <p class="subheading">Concierto creado correctamente</p>
                <v-btn block color="blue darken-3" dark @click="closeDialogCreateConciertoEvent">aceptar</v-btn>
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

export default {
  name: 'addConcierto',
  components: { addPrograma, previewprograma },
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
      dialogVistaPreviaPrograma: false,
      loading: false,
      obrasObj: null,
      loadingPreview: false,
      dialogImg: false,
      croppa: {},
      imgUrl: null,
      imgUrlToUpload: {}
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
      this.clearDataConcierto()
      this.$emit('closeDialogCreateConciertoEvent', true)
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
          if (programasDB.length > 0) {
            this.concierto.programa = programasDB[programasDB.length - 1]
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
        let newConcierto


        if (this.concierto.programa) {
          let programa
          typeof this.concierto.programa === 'object' ? programa = this.concierto.programa._id : programa = this.concierto.programa

          newConcierto = {
            titulo: this.concierto.titulo,
            descripcion: this.concierto.descripcion,
            fecha: this.dateCalendar,
            hora: this.concierto.hora,
            precio: this.concierto.precio,
            ubicacion: this.concierto.ubicacion,
            usuario: this.userLoginStore._id,
            programa
          }
        } else {
          newConcierto = {
            titulo: this.concierto.titulo,
            descripcion: this.concierto.descripcion,
            fecha: this.dateCalendar,
            hora: this.concierto.hora,
            precio: this.concierto.precio,
            ubicacion: this.concierto.ubicacion,
            usuario: this.userLoginStore._id
          }
        }

        axios.post(`${ this.$store.state.urlBackend }/conciertos`, qs.stringify(newConcierto))
          .then((res) => {
            console.log(res)
            this.subirImagenConcierto(res.data.concierto._id)
            this.dialogConciertoAgregado = true
            this.loading = false
          })
          .catch((err) => {
            console.log(err.response)
            this.loading = false
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
    },
    viewPrograma() {
      if (this.concierto.programa === null || this.concierto.programa === undefined || this.concierto.programa === '') { return }
      if (!this.login) { return }
      if (this.paramId === undefined) { return }

      this.loadingPreview = true

      let programa
      typeof this.concierto.programa === 'object' ? programa = this.concierto.programa._id : programa = this.concierto.programa
      
      axios.get(`${ this.$store.state.urlBackend }/programas/${ programa }`)
        .then((res) => {
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
        console.log('this.imgUrlToUpload generateImage', this.imgUrlToUpload)
        this.imgUrl = URL.createObjectURL(blob)
      })
    },
    subirImagenConcierto(idConcierto) {
        let bodyFormData = new FormData()
        bodyFormData.append('archivo', this.imgUrlToUpload)
        console.log('this.imgUrlToUpload', this.imgUrlToUpload)

        axios({
            method: 'put',
            url: `${ this.$store.state.urlBackend }/uploads/imgconciertos/${ idConcierto }`,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((res) => {
              console.log('res', res)
            })
            .catch((err) => {
              console.log(err.response)
            })
    },
    setBlobToProperty(blob) {
      this.imgUrlToUpload = blob
    }
  }
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
    #toolbarAddConcierto {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .dialogConciertoAgregado {
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
        .divImg {
          width: 500px;
        }
    }
</style>
