<template>
  <div>
    guitarristas
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'guitarristas',
  data () {
    return {

    }
  },
  beforeMount () {
    axios.get(`${ this.$store.state.urlBackend }/usuarios`)
      .then( res => { console.log(res.data) })
      .catch( err => { console.log(err) })
  }
}
</script>

<style scoped>

</style>

