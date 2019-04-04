<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/guitarristas">Guitarristas</router-link></li>
            <li><router-link to="/conciertos">Conciertos</router-link></li>
            <li><router-link to="/login" v-if="!userLogin">Login</router-link></li>
            <li><router-link to="/registro" v-if="!userLogin">Registro</router-link></li>
        </ul>
    </nav>
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
