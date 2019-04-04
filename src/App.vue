<template>
  <v-app>
    <vueNav></vueNav>
    <router-view></router-view>
  </v-app>
</template>

<script>
import vueNav from '@/components/nav'
export default {
  name: 'app',
  components: { vueNav }
}
</script>

<style>

</style>
