<template>
  <div>
    <v-progress-linear :indeterminate="true" color="grey darken-3" v-show="pageLoading"></v-progress-linear>
    <p v-show="toSearch && !noResultsSearch" class="subheading">Guitarristas que coinciden con "{{ toSearch }}"</p>
    <p v-show="toSearch && noResultsSearch" class="subheading">{{ noResultsSearch }}</p>
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
      usuarios: null,
      toSearch: this.$route.params.nom,
      noResultsSearch: null
    }
  },
  created () {
    this.getGuitarristas()
  },
  mounted() {
    this.$store.commit('pageIsMounted')    
    this.$store.commit('changeIconSearchBar', this.$route.name)
  },
  methods: {
    getGuitarristas () {
      if (this.toSearch) {
        axios.get(`${ this.$store.state.urlBackend }/usuarios/buscar/${ this.toSearch }`)
          .then((res) => {
            this.usuarios = res.data.usuarios
            this.pageLoading = false
          })
          .catch((err) => {
            // console.log(err.response)
            if (err.response.status === 400) {
              this.noResultsSearch = `No se encontró ningún guitarrista llamado "${ this.toSearch }"`
            }
            this.pageLoading = false
          })
      } else {
        axios.get(`${ this.$store.state.urlBackend }/usuarios`)
          .then((res) => {
            this.usuarios = res.data.usuarios
            this.pageLoading = false
          })
          .catch((err) => {
            // console.log(err.response)
            this.pageLoading = false
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
    grid-template-columns: 100fr;
  }

  @media (min-width: 960px) {
      .containerGrid {
        grid-template-columns: 33% 33% 33%;
      }
  }
</style>

