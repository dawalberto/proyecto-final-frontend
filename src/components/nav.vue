<template>
    <div>
    <v-toolbar>
        <v-toolbar-title><router-link to="/" id="logo">LOGO</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/guitarristas"><v-icon class="mr-3">fas fa-guitar</v-icon>guitarristas</v-btn>
            <v-btn flat to="/conciertos"><v-icon class="mr-3">fas fa-music</v-icon>conciertos</v-btn>
            <v-btn flat to="/login" v-if="!userLogin"><v-icon class="mr-3">fas fa-sign-in-alt</v-icon>entrar</v-btn>
            <v-btn flat to="/registro" v-if="!userLogin"><v-icon class="mr-3">fas fa-user-plus</v-icon>registrarse</v-btn>
            <v-menu transition="slide-y-transition" bottom v-if="userLogin">
                <template v-slot:activator="{ on }">
                    <v-btn flat v-on="on"><v-icon class="mr-3">fas fa-user</v-icon>{{ nomUsuario }}</v-btn>
                </template>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat to="/edit-perfil"><v-icon class="mr-3">fas fa-user</v-icon>perfil</v-btn></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat to="/cuenta"><v-icon class="mr-3">fas fa-cog</v-icon>cuenta</v-btn></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat @click="logout"><v-icon class="mr-3">fa-sign-out-alt</v-icon>cerrar sesión</v-btn></v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
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
                <v-list-tile-content><v-btn flat to="/edit-perfil"><v-icon class="mr-3">fas fa-user</v-icon>{{ nomUsuario }}</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat to="/cuenta"><v-icon class="mr-3">fas fa-cog</v-icon>cuenta</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat @click="logout"><v-icon class="mr-3">fa-sign-out-alt</v-icon>cerrar sesión</v-btn></v-list-tile-content>
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
            drawer: false,
            nomUsuario: ''
        }
    },
    computed: mapState(['login']),
    watch: {
        login (newVal) {
            this.userLogin = newVal
            this.userLogin ? this.nomUsuario = this.$store.state.user.nomUsuario : ''
        }
    },
    methods: {
        logout () {
          this.$store.commit('logout')
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
