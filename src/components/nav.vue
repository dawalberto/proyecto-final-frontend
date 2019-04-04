<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/guitarristas">Guitarristas</router-link>
        <router-link to="/conciertos">Conciertos</router-link>
        <router-link to="/login" v-if="!userLogin">Login</router-link>
        <router-link to="/registro" v-if="!userLogin">Registro</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'vueNav',
    data () {
        return {
            userLogin: false
        }
    },
    computed: mapState(['login']),
    watch: {
        login (newVal) {
            this.userLogin = newVal
        }
    }
}
</script>

<style scoped>

</style>
