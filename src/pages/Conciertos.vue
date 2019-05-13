<template>
  <div>
    <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
    <p v-show="showMsg">{{ msgNingunConcierto }}</p>
    <p v-show="toSearch && !noResultsSearch" class="subheading">Conciertos que coinciden con "{{ toSearch }}"</p>
    <p v-show="toSearch && noResultsSearch" class="subheading">{{ noResultsSearch }}</p>
    <div class="containerGrid">
      <previewConcierto
        v-for="c of conciertos"
        :key="c._id"
        :conciertoObj="c"
        :paramId="paramId"
        class="widthCards"
      ></previewConcierto>
    </div>

    <v-btn
    v-if="showButtonAddConcierto"
    class="btnAddConcierto"
    fab
    dark
    :large="!mobile"
    @click="dialogCreateConcierto = true"
    color="blue darken-3"
    title="Añadir concierto"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialogCreateConcierto" fullscreen hide-overlay transition="dialog-bottom-transition">
      <addConcierto
        @closeDialogCreateConciertoEvent="reloadConciertosAndCloseDialog"
      >
      </addConcierto>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import previewConcierto from '../components/previewConcierto'
import addConcierto from '../components/addConcierto'

export default {
  name: 'conciertos',
  components: { previewConcierto, addConcierto },
  data() {
    return {
      conciertos: [],
      paramId: this.$route.params.id,
      toSearch: this.$route.params.titulo,
      msgNingunConcierto: 'Guitarrista sin conciertos publicados',
      showMsg: false,
      dialogCreateConcierto: false,
      dialogPrograma: false,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      menuFecha: false,
      menuHora: false,
      pageLoading: true,
      noResultsSearch: null
    }
  },
  created() {
    this.getConciertos()
  },
  mounted() {
    this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    this.$store.commit('pageIsMounted')        
  },
  computed: {
    ...mapState(['login']),
    ...mapGetters(['userLoginStore']),
    showButtonAddConcierto() {
      if (this.login && this.paramId === this.userLoginStore._id) {
        return true
      }
      return false
    }
  },
  methods: {
    getConciertos() {
      if (this.paramId) {
        axios.get(`${ this.$store.state.urlBackend }/conciertos/usuarios/${ this.paramId }`)
          .then((res) => {
            if (res.data.ok) {
              this.conciertos = this.firstConciertosNotFinished(res.data.conciertos)
              this.showMsg = false
            } else {
              this.showMsg = true
            }
            this.pageLoading = false
          })
          .catch((err) => {
            console.log(err.response)
            this.pageLoading = false
          })
      } else if (this.toSearch) {
        axios.get(`${ this.$store.state.urlBackend }/conciertos/buscar/${ this.toSearch }`)
          .then((res) => {
            this.pageLoading = false
            this.conciertos = this.getConciertosNotFinished(res.data.conciertos)
          })
          .catch((err) => {
            if (err.response.status === 400) {
              this.noResultsSearch = `No se encontraron conciertos con el titulo "${ this.toSearch }"`
            }
            console.log(err.response)
            this.pageLoading = false
          })
      }else {
        axios.get(`${ this.$store.state.urlBackend }/conciertos`)
          .then((res) => {
            this.conciertos = this.getConciertosNotFinished(res.data.conciertos)
            this.pageLoading = false
          })
          .catch((err) => {
            console.log(err.response)
            this.pageLoading = false
          })
      }
    },
    reloadConciertosAndCloseDialog() {
      this.getConciertos()
      this.dialogCreateConcierto = false
    },
    getConciertosNotFinished(conciertos) {
      return conciertos.filter(concierto => {
        let today = new Date()
        let hoy = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        let dateConcierto = new Date(concierto.fecha)

        return dateConcierto >= hoy
      })
    },
    firstConciertosNotFinished(conciertos) {
      let conciertosNotFinished = this.getConciertosNotFinished(conciertos)
      let conciertosFinished = conciertos.filter(concierto => {
        let today = new Date()
        let hoy = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        let dateConcierto = new Date(concierto.fecha)

        return dateConcierto < hoy
      })

      return conciertosNotFinished.concat(conciertosFinished)
    }
  }
}
</script>

<style scoped>
    .containerGrid {
      display: grid;
      grid-gap: 1.5rem;
      grid-template-columns: 100fr;
    }
    .btnAddConcierto {
      z-index: 20;
      position: fixed;
      right: 2rem;
      bottom: 1.5rem;
    }

    @media (min-width: 960px) {
        .containerGrid {
          grid-template-columns: 33% 33% 33%;
        }
    }
</style>
