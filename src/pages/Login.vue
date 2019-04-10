<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-3">
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
                    @keyup.enter="login" 
                    v-model="email" 
                    prepend-icon="email" 
                    name="login" 
                    label="Email" 
                    type="text" 
                    :rules="[v => !!v || 'El email es obligatorio']">
                  </v-text-field>
                  <v-text-field 
                    id="password" 
                    @keyup.enter="login" 
                    v-model="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Contraseña" 
                    type="password"
                    :error-messages="msgLoginIncorrecto"
                    :rules="[v => !!v || 'La contraseña es obligatoria']">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="grey darken-3" @click="login" :disable="loading" :loading="loading">entrar</v-btn>
              </v-card-actions>
            </v-card>
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
          msgLoginIncorrecto: null
        }
    },
    computed: {

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

</style>
