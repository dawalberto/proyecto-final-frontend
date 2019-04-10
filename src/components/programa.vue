<template>
  <v-card class="containerGridPrograma">
    <label for="inputNombreProgramaId" class="label">NOMBRE DEL PROGRAMA</label>
    <v-text-field
      id="inputNombreProgramaId"
      v-model="nombrePrograma"
      class="inputNombrePrograma"
      type="text"
      :label="mobile ? 'Nombre del programa' : ''"
    ></v-text-field>

    <label for="inputObrasId" class="label">OBRAS</label>
    <v-card id="inputObrasId" class="inputObras">
      <v-chip dark v-for="obra of obras" :key="obra.id" :idObra="obra.id" :autor="obra.autor">
        {{obra.obra}}
        <v-icon class="ml-2 iconTrash" @click="deleteObra(obra.id)">fas fa-trash</v-icon>
      </v-chip>
    </v-card>
    <v-btn @click="dialogAddObra = true" class="btnDialogAddObra" color="grey darken-3" dark><v-icon>add</v-icon>añadir</v-btn>
    <v-dialog v-model="dialogAddObra" max-width="290">
      <v-card class="cardDialogAddObra">
        <v-text-field
            type="text"
            label="Obra"
        ></v-text-field>
        <v-text-field
            type="text"
            label="Compositor"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="dialogAddObra = false">cancelar</v-btn>
          <v-btn color="grey darken-3" flat @click="dialogAddObra = false">confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-spacer></v-spacer>
    <v-btn color="red" class="btnCancelar" :flat="mobile" dark @click="closeEvent">cancelar</v-btn>
    <v-btn color="light-blue accent-4" class="btnVistaPrevia" :flat="mobile" dark>vista previa</v-btn>
    <v-btn color="grey darken-3" class="btnConfirmar" :flat="mobile" dark>guardar</v-btn>

  </v-card>
</template>

<script>
export default {
  name: "programa",
  data() {
    return {
      nombrePrograma: null,
      obras: [],
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      dialogAddObra: false
    };
  },
  mounted() {
    this.breakpoint.smAndDown ? (this.mobile = true) : (this.mobile = false);
  },
  methods: {
    generateId() {
      let random = Math.random(578);
      let parte1 = Math.trunc(
        new Date().getMilliseconds() * Math.random(random)
      );
      let parte2 = Math.trunc(new Date().getMilliseconds() * Math.random());
      return parte1 + "_ID_" + parte2;
    },
    deleteObra(id) {
      console.log("test", this.obras.length);
      for (let i = 0; i < this.obras.length; i++) {
        console.log(this.obras[i]);
        if (id === this.obras[i].id) {
          this.obras.splice(i, 1);
          return;
        }
      }
    },
    closeEvent() {
        this.$emit('closeEvent', true)
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

    @media (min-width: 960px) {
        .containerGridPrograma {
            grid-template-columns: 33fr 33fr 33fr;
        }
        .label {
            grid-column: 1;
            justify-self: center;
            align-self: center;
            display: inline;
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