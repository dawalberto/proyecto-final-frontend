<template>
    <v-card class="containerPrograma" hover :class="[programaDeleted ? 'deleted' : '']">
        <p class="nomPrograma subheading"><v-icon class="mr-2">fas fa-book-open</v-icon>{{ programaProp.nombre }}</p>
        <v-card-actions class="botones">
            <v-btn
            fab
            small
            dark
            color="grey darken-3"
            @click="dialogs.vistaPrevia = true"
            title="Vista previa del programa"
            >
                <v-icon>fas fa-eye</v-icon>
            </v-btn>
            <v-btn
            fab
            small
            dark
            color="blue darken-3"
            @click="dialogs.updatePrograma = true"
            title="Editar programa"
            >
                <v-icon>fas fa-edit</v-icon>
            </v-btn>
            <v-btn
            fab
            small
            dark
            color="red darken-3"
            @click="dialogs.deletePrograma = true"
            title="Eliminar programa"
            >
                <v-icon>fas fa-trash</v-icon>
            </v-btn>
        </v-card-actions>

        <v-dialog v-model="dialogs.vistaPrevia">
            <previewprograma
            :obrasObj="programaProp.obras"
            ></previewprograma>
        </v-dialog>

        <v-dialog v-model="dialogs.updatePrograma" persistent max-width="800" color="red">
            <updateprograma 
                @closeProgramEvent="dialogs.updatePrograma = false"
                @programUpdatedEvent="programUpdated"
                :programaProp="programaProp"
            ></updateprograma>
        </v-dialog>

        <v-dialog v-model="dialogs.deletePrograma" max-width="500">
            <v-card class="cardDialogAlerDeletePrograma" color="grey lighten-3">
                <p class="subheading">¿Deseas eliminar el programa?</p>
                <v-btn block color="grey darken-3" dark @click="dialogs.deletePrograma = false">cancelar</v-btn>
                <v-btn block color="red darken-3" :dark="!loadingBtnEliminar" :loading="loadingBtnEliminar" :disabled="loadingBtnEliminar" @click="deletePrograma">eliminar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogs.alertProgramaDeleted" max-width="500">
            <v-card class="cardDialogAlertProgramaDeleted" color="grey lighten-3">
                <p class="subheading">Programa eliminado correctamente</p>
                <v-btn block color="blue darken-3" dark @click="dialogs.alertProgramaDeleted = false">aceptar</v-btn>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import axios from 'axios'
import previewprograma from './previewPrograma'
import updateprograma from './updatePrograma'

export default {
    name: 'programa',
    props: ['programaProp'],
    components: { previewprograma, updateprograma },
    data() {
        return {
            dialogs: {
                vistaPrevia: false,
                updatePrograma: false,
                deletePrograma: false,
                alertProgramaDeleted: false
            },
            loadingBtnEliminar: false,
            programaDeleted: false
        }
    },
    methods: {
        programUpdated() {
            this.dialogs.updatePrograma = false
            this.$emit('programUpdatedEvent', true)
        },
        deletePrograma() {
            this.loadingBtnEliminar = true
            axios.delete(`${ this.$store.state.urlBackend }/programas/${ this.programaProp._id }`)
                .then((res) => {
                    this.dialogs.deletePrograma = false
                    this.dialogs.alertProgramaDeleted = true
                    this.programaDeleted = true
                    this.loadingBtnEliminar = false
                })
                .catch((err) => {
                    console.log(err.response)
                    this.loadingBtnEliminar = false
                })
        },
        afterUpdateConcierto() {
            this.dialogUpdateConcierto = false
            this.$router.push('/conciertos')
        }
    }
}
</script>

<style scoped>
    .containerPrograma {
        padding: 1rem;
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 100%
    }
    .nomPrograma {
        justify-self: center;
        align-self: center;
    }
    .botones {
        justify-self: center;
        align-self: center;
    }
    .cardDialogAlerDeletePrograma, .cardDialogAlertProgramaDeleted {
        padding: 2rem;
    }
    .deleted {
        display: none;
    }

    @media (min-width: 960px) {
        .containerPrograma {
            grid-template-columns: auto auto;
        }
        .nomPrograma {
            grid-column: 1;
            justify-self: start;
            align-self: end;
        }
        .botones {
            grid-column: 2;
            justify-self: end;
            align-self: center;
        }
    }
</style>
