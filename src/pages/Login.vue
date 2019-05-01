<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey darken-4">
                <v-toolbar-title>INICIA SESIÓN</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="formValid"
                >
                  <v-text-field 
                    id="email" 
                    color="blue darken-3"                    
                    @keyup.enter="login" 
                    v-model="email" 
                    prepend-icon="email" 
                    name="login" 
                    label="Email" 
                    type="text"
                    :rules="[v => !!v || 'El email es obligatorio']"
                    >
                  </v-text-field>
                  <v-text-field 
                    id="password" 
                    color="blue darken-3"
                    @keyup.enter="login" 
                    v-model="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Contraseña" 
                    :error-messages="msgLoginIncorrecto"
                    :rules="[v => !!v || 'La contraseña es obligatoria']"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    @click:append="showPassword = !showPassword"
                    >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  :loading="loading"
                  :disabled="loading" 
                  :dark="!loading" 
                  @click="login" 
                  block 
                  color="blue-grey darken-4" 
                >
                  entrar
                </v-btn>
              </v-card-actions>
            </v-card>
            <p class="subheading mt-3 text-xs-center grey--text">O registrate <a href="#/registro">aquí</a> si no estás registrado</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'login',
    data () {
        return {
          email: null,
          password: null,
          loading: false,
          formValid: true,
          msgLoginIncorrecto: null,
          showPassword: false
        }
    },
    mounted() {
      this.$store.commit('pageIsMounted')      
    },
    methods: {
        login () {
          this.msgLoginIncorrecto = null

          let email = this.email
          let password = this.password

          let user = {
              email,
              password
          }

          if (this.$refs.form.validate()) {

            this.loading = true
            
            axios.post(`${ this.$store.state.urlBackend }/login`, qs.stringify(user))
                .then((res) => { 
                    this.$store.commit('login', res.data.usuario)
                    this.$store.commit('setTokenLogin', res.data.token)
                    this.$router.push(`/perfil/${ this.$store.state.user._id }`)
                    this.loading = false
                    console.log('Login ok')
                })
                .catch((err) => { 
                  this.loading = false
                  let status = err.response.status

                  if (status === 401) {
                    this.msgLoginIncorrecto = 'Usuario o contraseña incorrecto'
                  }
                })

          }
        }
    }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
