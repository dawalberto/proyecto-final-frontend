<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
              <v-card-title class="headline">Usuario registrado correctamente</v-card-title>
              <v-card-text>A continuación será redirigido a la página de inicio de sesión.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="grey darken-3" @click="redirectToLogin">aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey darken-4">
                <v-toolbar-title>REGISTRATE</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="formValid"
                >
                  <v-text-field
                    v-model="email"
                    id="email" 
                    prepend-icon="email" 
                    name="login" 
                    label="Email" 
                    type="text"
                    :error-messages="msgRegistroEmail"
                    :rules="[v => !!v || 'El email es obligatorio']">
                  </v-text-field>
                  <v-text-field
                    v-model="nomUsuario"
                    id="nomUsuario" 
                    prepend-icon="fas fa-user" 
                    name="login" 
                    label="Nombre de usuario" 
                    type="text"
                    :error-messages="msgRegistroNomUsuario"
                    :rules="[v => !!v || 'El nombre de usuario es obligatorio']">
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Contraseña"
                    :error-messages="msgRegistroPassword"
                    :rules="[v => !!v || 'La contraseña es obligatoria']"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    @click:append="showPassword = !showPassword"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="passwordRepeat"
                    id="passwordRepeat" 
                    prepend-icon="lock" 
                    name="passwordRepeat" 
                    label="Repetir contraseña"
                    :error-messages="msgRegistroPasswordRepeat"
                    :rules="[v => !!v || 'La contraseña es obligatoria']"
                    :type="showPasswordRepeat ? 'text' : 'password'"
                    :append-icon="showPasswordRepeat ? 'visibility' : 'visibility_off'"
                    @click:append="showPasswordRepeat = !showPasswordRepeat"
                    >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  :disable="loading" 
                  :loading="loading"
                  :dark="!loading" 
                  @click="registrar" 
                  color="blue-grey darken-4" 
                  block 
                >
                  registrar
                </v-btn>
              </v-card-actions>
            </v-card>
            <div class="containerConditions">
              <v-checkbox
                v-model="checkboxTerms"
                color="blue-grey darken-3"
                :error="errorCheckbox"
                class="checkbox"
              ></v-checkbox>
              <p class="subheading mt-3 text-xs-center grey--text conditions">He leido y acepto los <a href="#/terms-of-use">Terminos de uso</a> y la <a href="#/privacy-policy">Politica de privacidad</a></p>
            </div>
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
          formValid: true,
          email: null,
          password: null,
          nomUsuario: null,
          passwordRepeat: null,
          loading: false,
          msgRegistroEmail: null,
          msgRegistroNomUsuario: null,
          msgRegistroPassword: null,
          msgRegistroPasswordRepeat: null,
          dialog: false,
          showPassword: false,
          showPasswordRepeat: false,
          checkboxTerms: false,
          errorCheckbox: false
        }
    },
    mounted() {
      this.$store.commit('pageIsMounted')      
    },
    methods: {
        registrar () {
          this.msgRegistroEmail = null
          this.msgRegistroNomUsuario = null
          this.msgRegistroPassword = null
          this.msgRegistroPasswordRepeat = null

            let email = this.email
            let password = this.password
            let nomUsuario = this.nomUsuario

            let newUser = {
                email,
                password,
                nomUsuario
            }

            if (this.$refs.form.validate() && this.validateEmail(this.email) && this.validateTerms()) {
              let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              if (!regEx.test(this.password)) {
                this.msgRegistroPassword = 'La contraseña debe tener como mínimo 8 caracteres, al menos una letra minúscula, una mayúscula, un número y un caracter especial(@ $ ! % * ? &)'
                return
              }

              if (this.password !== this.passwordRepeat) {
                this.msgRegistroPasswordRepeat = 'Las contaseñas no coinciden'
                return
              }

              this.loading = true

              axios.post(`${ this.$store.state.urlBackend }/usuarios`, qs.stringify(newUser))
                  .then(res => {
                    this.dialog = true
                    this.loading = false
                  })
                  .catch(err => {
                    console.log(err.response)
                    if (err.response.data.err.errors.email) {
                      this.msgRegistroEmail = 'Este email ya está registrado'
                    }
                    if (err.response.data.err.errors.nomUsuario) {
                      this.msgRegistroNomUsuario = 'El nombre de usuario ya existe'
                    }
                    this.loading = false
                  })
            }
        },
        redirectToLogin() {
          this.dialog = false
          this.$router.push('/login')
        },
        validateEmail(email) {
          let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          let res = regEx.test(String(email).toLowerCase())
          res ? this.msgRegistroEmail = null : this.msgRegistroEmail = 'El email no es válido'
          return res
        },
        validateTerms() {
          this.checkboxTerms ? this.errorCheckbox = false : this.errorCheckbox = true

          return this.checkboxTerms
        }
    }
}
</script>

<style scoped>
  .containerConditions {
    display: grid;
    grid-template-columns: auto auto;
  }
  .checkbox {
    grid-column: 1;
    justify-self: end;
  }
  .conditions {
    align-self: center;
    grid-column: 2;
  }
</style>
