<template>
  <div class="containerGrid">
    <previewConcierto
      v-for="c of conciertos"
      :key="c._id"
      :conciertoObj="c"
    ></previewConcierto>
  </div>
</template>

<script>
import axios from 'axios'
import previewConcierto from '../components/previewConcierto'

export default {
  name: 'conciertos',
  components: { previewConcierto },
  data() {
    return {
      conciertos: [],
      paramId: this.$route.params.id
    }
  },
  created() {
    this.getConciertos()
  },
  methods: {
    getConciertos() {
      if (this.paramId) {
        axios.get(`${ this.$store.state.urlBackend }/conciertos/usuarios/${ this.paramId }`)
          .then((res) => {
            console.log('this.paramId',this.paramId)
            this.conciertos = res.data.conciertos
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
            grid-template-columns: 50% 50%;
        }
    }
</style>
