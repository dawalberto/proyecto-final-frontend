<template>
  <div class="containerGrid">
    <p v-show="showMsg">{{ msgNingunConcierto }}</p>
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
      color="grey darken-3"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import previewConcierto from '../components/previewConcierto'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'conciertos',
  components: { previewConcierto },
  data() {
    return {
      conciertos: [],
      paramId: this.$route.params.id,
      msgNingunConcierto: 'Todavía no has publicado ningún concierto',
      showMsg: false
    }
  },
  created() {
    this.getConciertos()
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
    }
  }
}
</script>

<style scoped>
    .containerGrid {
      display: grid;
      grid-gap: 1.5rem;
      grid-auto-columns: 100%;
    }

    @media (min-width: 960px) {
        .containerGrid {
          grid-template-columns: 33fr 33fr 33fr;
        }
    }
</style>
