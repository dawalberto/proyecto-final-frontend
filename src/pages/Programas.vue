<template>
    <div>
        <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
        <p v-show="programas.length <= 0">Aquí podrás gestionar programas de música para añadirlos a tus conciertos</p>
        <programa
        v-for="p of programas"
        :key="p._id"
        :programaProp="p"
        @programUpdatedEvent="getProgramas"
        >
        </programa>

        <v-btn
        class="btnAddPrograma"
        fab
        dark
        @click="dialogCreateProgram = true"
        color="blue darken-3"
        title="Añadir programa"
        >
        <v-icon>add</v-icon>
        </v-btn>

        <v-dialog v-model="dialogCreateProgram" persistent max-width="800" transition="dialog-bottom-transition">
            <addPrograma
            @closeProgramEvent="dialogCreateProgram = false"
            @programSavedEvent="programSaved"
            ></addPrograma>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import programa from '../components/programa.vue'
import addPrograma from '../components/addPrograma.vue'

export default {
    name: 'Programas',
    components: { programa, addPrograma },
    data() {
        return {
            programas: [],
            pageLoading: true,
            dialogCreateProgram: false
        }
    },
    mounted() {
        this.getProgramas()
        this.$store.commit('pageIsMounted')
    },
    computed: {
        ...mapGetters(['userLoginStore'])
    },
    methods: {
        getProgramas() {
            axios.get(`${ this.$store.state.urlBackend }/programas/usuarios/${ this.userLoginStore._id }`)
                .then((res) => {
                    this.programas = res.data.programas
                    this.pageLoading = false
                })
                .catch((err) => {
                    // console.log(err)
                    this.pageLoading = false
                })
        },
        programSaved() {
            this.getProgramas()
        }
    }
}
</script>

<style scoped>
    .btnAddPrograma {
        z-index: 10;
        position: fixed;
        right: 2rem;
        bottom: 1.5rem;
    }
</style>
