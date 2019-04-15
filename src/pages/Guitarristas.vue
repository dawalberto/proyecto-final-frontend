<template>
  <div>
    <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
    <div class="containerGrid">
      <previewGuitarrista
      v-for="g of usuarios"
      :key="g._id"
      :guitarristaProp="g"
      >
      </previewGuitarrista>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import previewGuitarrista from '@/components/previewGuitarrista'

export default {
  name: 'guitarristas',
  components: { previewGuitarrista },
  data () {
    return {
      pageLoading: true,
      usuarios: null
    }
  },
  beforeMount () {
    axios.get(`${ this.$store.state.urlBackend }/usuarios`)
      .then((res) => {
        this.usuarios = res.data.usuarios
        this.pageLoading = false
      })
      .catch((err) => {
        console.log(err)
      })
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

