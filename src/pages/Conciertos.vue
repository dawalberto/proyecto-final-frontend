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
      conciertos: []
    }
  },
  created() {
    this.getConciertos()
  },
  methods: {
    getConciertos() {
      axios.get(`${ this.$store.state.urlBackend }/conciertos`)
        .then((res) => {
          this.conciertos = res.data.conciertos
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style scoped>
    .containerGrid {
      display: grid;
      grid-gap: 0.9rem;
      grid-auto-columns: 100%;
    }

    @media (min-width: 960px) {
        .containerGrid {
            grid-template-columns: 50% 50%;
        }
    }
</style>
