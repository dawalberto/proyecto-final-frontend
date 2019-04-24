<template>
  <v-card class="containerGridPrograma">
    <label for="inputNombreProgramaId" class="label font-weight-medium">NOMBRE DEL PROGRAMA</label>
    <v-text-field
      id="inputNombreProgramaId"
      v-model="nombrePrograma"
      class="inputNombrePrograma"
      type="text"
      :label="mobile ? 'Nombre del programa' : ''"
      :error-messages="msgErrorNombrePrograma"
      :counter="counterNombrePrograma"
    ></v-text-field>

    <label for="inputObrasId" class="label font-weight-medium">OBRAS</label>
    <v-card id="inputObrasId" class="inputObras">
      <v-chip 
        v-for="obra of obras" 
        :key="obra.id" 
        :idObra="obra.id" 
        :compositor="obra.compositor"
        :color="obra.color"
        dark
      >
        {{obra.obra}}
        <v-icon class="ml-2 iconTrash" @click="deleteObra(obra.id)">fas fa-trash</v-icon>
      </v-chip>
    </v-card>
    <v-btn @click="dialogAddObra = true" class="btnDialogAddObra" color="blue darken-3" dark>añadir<v-icon class="ml-2">fas fa-plus</v-icon></v-btn>
    <v-dialog v-model="dialogAddObra" persistent max-width="290">
      <v-card class="cardDialogAddObra" color="grey lighten-3">
        <v-text-field
        v-model="obra"
            type="text"
            label="Obra"
        ></v-text-field>
        <v-text-field
            v-model="compositor"
            type="text"
            label="Compositor"
            @keyup.enter="addObra"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-3" dark @click="dialogAddObra = false">salir<v-icon class="ml-2">fas fa-times</v-icon></v-btn>
          <v-btn color="green darken-3" dark @click="addObra">añadir<v-icon class="ml-2">fas fa-plus</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAlertProgramSaved" persistent max-width="500">
      <v-card class="cardDialogAlertProgramSaved" color="grey lighten-3">
        <p class="subheading">Programa actualizado correctamente</p>
        <v-btn block color="blue darken-3" dark @click="afterSaveProgram">aceptar</v-btn>
      </v-card>
    </v-dialog>

    <v-spacer></v-spacer>
    <v-btn color="red darken-3" @click="closeProgramEvent" class="btnCancelar" dark>cancelar</v-btn>
    <v-btn color="blue-grey darken-3" @click="obras.length > 0 ? dialogVistaPrevia = true : ''" class="btnVistaPrevia" dark>vista previa<v-icon class="ml-2">fas fa-eye</v-icon></v-btn>
    <v-btn color="green darken-3" @click="updateProgram" class="btnConfirmar" dark>actualizar<v-icon class="ml-2">fas fa-sync-alt</v-icon></v-btn>

    <v-dialog v-model="dialogVistaPrevia">
      <previewprograma
      :obrasObj="obras"
      ></previewprograma>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapGetters } from 'vuex'
import previewprograma from './previewPrograma'

export default {
  name: "updatePrograma",
  props: [ 'programaProp' ],
  components: { previewprograma },
  data() {
    return {
      nombrePrograma: null,
      obras: [],
      obra: null,
      compositor: null,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      dialogAddObra: false,
      dialogVistaPrevia: false,
      dialogAlertProgramSaved: false,
      msgErrorNombrePrograma: null,
      counterNombrePrograma: 30
    };
  },
  created() {
    axios.defaults.headers.common['token'] = this.$store.state.token
  },
  mounted() {
    this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    this.nombrePrograma = this.programaProp.nombre

    this.obras = this.programaProp.obras.map(obra => { return { id: this.generateId(), obra: obra.obra, compositor: obra.compositor } })
  },
  computed: {
    ...mapGetters(['userLoginStore'])
  },
  methods: {
    updateProgram() {
      let obras = this.obras.map(obra => { return { obra: obra.obra, compositor: obra.compositor } })
      
      let programa = {
        nombre: this.nombrePrograma,
        obras
      }

      this.msgErrorNombrePrograma = null

      //Validacion
      if (this.nombrePrograma === null || this.nombrePrograma === '' || this.nombrePrograma === undefined) {
        this.msgErrorNombrePrograma = 'El nombre del programa es obligatorio'
        return
      }

      if (this.nombrePrograma.length > this.counterNombrePrograma) {
        this.msgErrorNombrePrograma = 'El nombre del programa no debe superar los ' + this.counterNombrePrograma + ' caracteres'
        return
      }

      axios.put(`${ this.$store.state.urlBackend }/programas/${ this.programaProp._id }`, qs.stringify(programa))
        .then((res) => {
          console.log(res)
          this.dialogAlertProgramSaved = true
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    generateId() {
      let random = Math.random() * 900
      let parte1 = Math.trunc(new Date().getMilliseconds() * (Math.random() * random))
      let parte2 = Math.trunc(new Date().getMilliseconds() * Math.random())
      return parte1 + "_ID_" + parte2
    },
    deleteObra(id) {
      for (let i = 0; i < this.obras.length; i++) {
        console.log(this.obras[i])
        if (id === this.obras[i].id) {
          this.obras.splice(i, 1)
          return
        }
      }
    },
    addObra() {
      let newObra = { id: this.generateId(), obra: this.obra, compositor: this.compositor, color: this.getRandomColor() }
      this.obras.push( newObra )
      this.obra = null
      this.compositor = null
      this.dialogAddObra = false
    },
    closeProgramEvent() {
      this.nombrePrograma = this.programaProp.nombre
      this.obras = this.programaProp.obras.map(obra => { return { id: this.generateId(), obra: obra.obra, compositor: obra.compositor } })
      this.$emit('closeProgramEvent', true)
    },
    getRandomColor() {
      let colors = [
        'red', 
        'pink', 
        'purple', 
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'teal',
        'green',
        'light-green',
        'orange',
        'deep-orange',
        'brown',
        'blue-grey',
        'grey'
      ]

      let color = Math.floor(Math.random() * colors.length)

      return colors[color]
    },
    afterSaveProgram() {
      // this.nombrePrograma = null
      // this.obras = []
      this.dialogAlertProgramSaved = false
      this.$emit('programUpdatedEvent', true)
    }
  }
};
</script>

<style scoped>
  .containerGridPrograma {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 85fr 15fr;
    padding: 2rem;
  }
  .label {
    display: none;
  }
  .cardDialogAddObra {
    padding: 2rem;
  }
  .inputNombrePrograma {
    grid-column: 1 / 3;
  }
  .inputObras {
    grid-column: 1;
  }
  .btnDialogAddObra {
    grid-column: 2;
    align-self: center;
  }
  .btnCancelar {
    grid-column: 1 / 3;
  }
  .btnVistaPrevia {
    grid-column: 1 / 3;
  }
  .btnConfirmar {
    grid-column: 1 / 3;
  }
  .cardDialogAlertProgramSaved {
    padding: 2rem;
  }

  @media (min-width: 960px) {
    .containerGridPrograma {
      grid-template-columns: 33fr 33fr 33fr;
    }
    .label {
      grid-column: 1;
      justify-self: end;
      align-self: center;
      display: inline;
      margin-right: 2.5rem;
    }
    .inputObras {
      grid-column: 2;
    }
    .btnDialogAddObra {
      grid-column: 3;
    }
    .inputNombrePrograma {
      grid-column: 2 / 4;
    }
    .btnCancelar {
      grid-column: 1;
    }
    .btnVistaPrevia {
      grid-column: 2;
    }
    .btnConfirmar {
      grid-column: 3;
    }

  }
</style>