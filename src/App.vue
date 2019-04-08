<template>
  <v-app>
    <vueNav id="vueNavId"></vueNav>
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
  #vueNavId {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
  }

  @media (min-width: 960px) {
    #router {
      padding: 3rem;
      margin-left: 10rem;
      margin-right: 10rem;
    }
  }
</style>
