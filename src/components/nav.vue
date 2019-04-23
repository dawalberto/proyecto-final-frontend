<template>
    <div>
    <v-toolbar>
        <v-toolbar-title>
            <router-link to="/" id="logo">
                <v-avatar 
                color="#F5F5F5" 
                :size="mobile ? 48 : 64"
                class="mr-2"
                >
                    <img src="@/assets/logo-proyecto.png" alt="" loading="lazy">
                </v-avatar>
                <span class="spanLogo font-weight-light">clasicaguitarra.com</span>
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="toSearch"
        class="mx-2 mt-1"
        flat
        color="grey lighten-1"
        :label="labelSearch"
        append-outer-icon="search"
        :append-icon="icon"
        solo-inverted
        @click:append-outer="search"
        @click:append="changeIcon"
        @keyup.enter="search"
        >
        </v-text-field>
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
                        <v-list-tile-content><v-btn flat :to="urlToPerfil"><v-icon class="mr-3">fas fa-user</v-icon>ver perfil</v-btn></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat to="/edit-perfil"><v-icon class="mr-3">fas fa-user-edit</v-icon>editar perfil</v-btn></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat :to="urlToConciertosUser"><v-icon class="mr-3">fas fa-music</v-icon>mis conciertos</v-btn></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content><v-btn flat to="/programas"><v-icon class="mr-3">fas fa-book-open</v-icon>mis programas</v-btn></v-list-tile-content>
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
                <v-list-tile-content><v-btn flat :to="urlToPerfil"><v-icon class="mr-3">fas fa-user</v-icon>ver perfil</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat to="/edit-perfil"><v-icon class="mr-3">fas fa-user-edit</v-icon>editar perfil</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat :to="urlToConciertosUser"><v-icon class="mr-3">fas fa-music</v-icon>mis conciertos</v-btn></v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="userLogin">
                <v-list-tile-content><v-btn flat to="/programas"><v-icon class="mr-3">fas fa-book-open</v-icon>mis programas</v-btn></v-list-tile-content>
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
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'vueNav',
    data () {
        return {
            userLogin: false,
            drawer: false,
            nomUsuario: '',
            urlToPerfil: null,
            urlToConciertosUser: null,
            breakpoint: this.$vuetify.breakpoint,
            mobile: true,
            toSearch: null,
            iconIndex: 0,
            icons: ['fas fa-user', 'fas fa-music'],
            iconSelected: null,
            labelSearch: null
        }
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    },
    computed: {
        ...mapState(['login']),
        ...mapGetters(['userLoginStore']),
        icon () {
            this.iconSelected = this.icons[this.iconIndex]
            return this.icons[this.iconIndex]
        },
        setLabelSearch() {
            if (this.iconIndex === 0) {

                this.labelSearch = 'Encuentra cualquier guitarrista'
            }
        }
    },
    watch: {
        login (newVal) {
            this.userLogin = newVal
            this.userLogin ? this.nomUsuario = this.userLoginStore.nomUsuario : ''
            this.userLogin ? this.urlToPerfil = `/perfil/${ this.userLoginStore._id }` : ''
            this.userLogin ? this.urlToConciertosUser = `/conciertos/${ this.userLoginStore._id }` : ''
        }
    },
    methods: {
        logout() {
            this.$router.push('/')
            this.$store.commit('logout')
            console.log('Logout ok')
        },
        search() {
            if (this.toSearch) {
                if (this.iconSelected === 'fas fa-user') {
                    this.$router.push(`/guitarristas/buscar/${ this.toSearch }`)
                } else if (this.iconSelected === 'fas fa-music') {
                    this.$router.push(`/conciertos/buscar/${ this.toSearch }`)                
                }
            }
        },
        changeIcon() {
            this.iconIndex === this.icons.length - 1
            ? this.iconIndex = 0
            : this.iconIndex++
        }
    }
}
</script>

<style scoped>
    #logo {
        text-decoration: none;
        color: black;
    }
    .spanLogo {
        display: none;
    }

    @media (min-width: 960px) {
        .spanLogo {
            display: inline;
        }
    }
</style>
