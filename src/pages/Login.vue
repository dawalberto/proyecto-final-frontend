<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-3">
                <v-toolbar-title>INICIA SESIÓN</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field id="email" prepend-icon="email" name="login" label="Email" type="text" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="grey darken-3" @click="login">Login</v-btn>
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

        }
    },
    computed: {

    },
    methods: {
        login () {
            let email = document.querySelector('#email').value
            let password = document.querySelector('#password').value

            let user = {
                email,
                password
            }

            axios.post(`${ this.$store.state.urlBackend }/login`, qs.stringify(user))
                .then((res) => { 
                    this.$store.commit('login', res.data.usuario)
                    this.$store.commit('setTokenLogin', res.data.token)
                    this.$router.push('/')
                    // eslint-disable-next-line
                    console.log('Login ok')
                })
                .catch((err) => { 
                    // eslint-disable-next-line
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>

</style>
