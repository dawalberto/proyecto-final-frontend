<template>
  <div>
    guitarristas
  </div>
</template>

<script>
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
    axios.get('http://192.168.56.101:3000/usuarios')
      .then( res => { console.log(res.data) })
      .catch( err => { console.log(err) })
  }
}
</script>

<style scoped>

</style>

