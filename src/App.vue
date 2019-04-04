<template>
  <div>
    <vueNav></vueNav>
    <router-view></router-view>
  </div>
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
