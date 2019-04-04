<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/guitarristas">Guitarristas</router-link> |
    <router-link to="/conciertos">Conciertos</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/registro">Registro</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

}
</script>

<style>

</style>
