<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-3">
                <v-toolbar-title>REGISTRATE</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field id="email" prepend-icon="email" name="login" label="Email" type="text"></v-text-field>
                  <v-text-field id="nomUsuario" prepend-icon="person" name="login" label="Nombre de usuario" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-3" dark @click="registrar" :disable="loading" :loading="loading">registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'registro',
    data () {
        return {
            loading: false
        }
    },
    methods: {
        registrar () {
            this.loading = true

            let email = document.querySelector('#email').value
            let password = document.querySelector('#password').value
            let nomUsuario = document.querySelector('#nomUsuario').value

            let newUser = {
                email,
                password,
                nomUsuario
            }

            axios.post(`${ this.$store.state.urlBackend }/usuarios`, qs.stringify(newUser))
                .then(res => {
                  console.log(res.data)
                  this.loading = false
                })
                .catch(err => {
                  console.log(err.data)
                  this.loading = false
                })
        }
    }
}
</script>

<style scoped>

</style>
