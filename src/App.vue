<template>
  <v-app>
    <vueNav id="vueNavId"></vueNav>
    <router-view :key="$route.fullPath" id="router"></router-view>
    <vueFooter v-show="pageIsMounted"></vueFooter>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import vueNav from '@/components/nav'
import vueFooter from '@/components/footer'

export default {
  name: 'app',
  components: { vueNav, vueFooter },
  computed: {
    ...mapState(['pageIsMounted'])
  }
}
</script>

<style>
  #router {
    padding: 1rem;
    min-height: 100vh;
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
