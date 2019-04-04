<template>
    <div>
    <v-toolbar>
        <v-toolbar-title><router-link to="/" id="logo">EL GUITARRISTA CLASICO</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/guitarristas"><v-icon class="mr-3">fas fa-guitar</v-icon>guitarristas</v-btn>
            <v-btn flat to="/conciertos"><v-icon class="mr-3">fas fa-music</v-icon>conciertos</v-btn>
            <v-btn flat to="/perfil" v-if="userLogin"><v-icon>fas fa-user</v-icon></v-btn>
            <v-btn flat to="/login" v-if="!userLogin"><v-icon class="mr-3">fas fa-sign-in-alt</v-icon>entrar</v-btn>
            <v-btn flat to="/registro" v-if="!userLogin"><v-icon class="mr-3">fas fa-user-plus</v-icon>registrarse</v-btn>
        </v-toolbar-items>
        <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app right disable-resize-watcher dark>
        <v-list>
            <v-list-tile v-if="!userLogin">
                <v-list-tile-content><v-btn flat to="/login"><v-icon class="mr-3">fas fa-sign-in-alt</v-icon>entrar</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="!userLogin">
                <v-list-tile-content><v-btn flat to="/registro"><v-icon class="mr-3">fas fa-user-plus</v-icon>registrarse</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat to="/perfil"><v-icon class="mr-3">fas fa-user</v-icon></v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat to="/logout"><v-icon class="mr-3">fa-sign-out-alt</v-icon>cerrar sesión</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content><v-btn flat to="/guitarristas"><v-icon class="mr-3">fas fa-guitar</v-icon>guitarristas</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content><v-btn flat to="/conciertos"><v-icon class="mr-3">fas fa-music</v-icon>conciertos</v-btn></v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'vueNav',
    data () {
        return {
            userLogin: false,
            drawer: false
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
    #logo {
        text-decoration: none;
        color: black;
    }
</style>
