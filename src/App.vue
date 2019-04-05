<template>
  <v-app>
    <vueNav></vueNav>
    <router-view id="router"></router-view>
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
  #router {
    padding: 1rem;
  }

  @media (min-width: 960px) {
    #router {
      padding: 3rem;
    }
  }
</style>
