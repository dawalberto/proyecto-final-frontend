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
      msgNingunConcierto: 'Guitarrista sin conciertos publicados',
      showMsg: false,
      dialogCreateConcierto: false,
      dialogPrograma: false,
      breakpoint: this.$vuetify.breakpoint,
      mobile: true,
      menuFecha: false,
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
    },
    reloadConciertosAndCloseDialog() {
      this.getConciertos()
      this.dialogCreateConcierto = false
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

    @media (min-width: 960px) {
        .containerGrid {
          grid-template-columns: 33% 33% 33%;
        }
    }
</style>
