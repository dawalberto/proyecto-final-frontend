<template>
    <div class="containerGrid">
        <p class="titlePassword subheading font-weight-bold">CAMBIAR CONTRASEÑA</p>
        <label for="inputCurrentPassword" class="label">CONTRASEÑA ACTUAL</label>
        <v-text-field 
        id="inputCurrentPassword" 
        v-model="supposedPassword" 
        class="input" 
        :type="showSupposedPassword ? 'text' : 'password'"
        :append-icon="showSupposedPassword ? 'visibility' : 'visibility_off'"
        :error-messages="errors.supposedPassword"
        :label="mobile ? 'Contraseña actual' : ''"
        @click:append="showSupposedPassword = !showSupposedPassword">
        </v-text-field>

        <label for="inputNewPassword" class="label">NUEVA CONTRASEÑA</label>
        <v-text-field 
        id="inputNewPassword" 
        v-model="newPassword" 
        class="input" 
        :type="showNewPassword ? 'text' : 'password'"
        :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
        :error-messages="errors.newPassword"
        :label="mobile ? 'Nueva contraseña' : ''"
        @click:append="showNewPassword = !showNewPassword">
        </v-text-field>
        <v-btn dark :block="mobile" @click="changePassword" class="btnChangePassword" color="grey darken-3">cambiar contraseña</v-btn>

        <v-dialog v-model="dialogs.passwordChanged" persistent max-width="500">
            <v-card class="cardDialogAlertPasswordChanged" dark color="green darken-3">
                <p class="subheading">Contraseña actualizada correctamente</p>
                <v-btn block color="grey darken-3" @click="afterChangePassword">aceptar</v-btn>
            </v-card>
        </v-dialog>
        
        <p class="titleCuenta subheading font-weight-bold">ELIMINAR CUENTA</p>
        <v-btn @click="dialogs.confirmDeleteCuenta = true" class="btnDelete" block dark color="red darken-3">eliminar cuenta<v-icon class="ml-2">fas fa-exclamation-triangle</v-icon></v-btn>

        <v-dialog v-model="dialogs.confirmDeleteCuenta" max-width="500">
            <v-card class="cardDialogAlerDeleteCuenta">
                <p class="subheading">¿Está useted seguro/a de que desea eliminar su cuenta?</p>
                <p class="subheading">En caso de eliminarla no podrá volver a entrar con esta cuenta y todos sus conciertos y programas serán eliminados de forma permanente.</p>
                <v-btn block dark color="black" @click="dialogs.confirmDeleteCuenta = false">cancelar</v-btn>
                <v-btn block dark color="red darken-3" :loading="loading" @click="dialogs.passwordToDeleteCuenta = true">eliminar</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogs.passwordToDeleteCuenta" persistent max-width="500">
            <v-card class="cardDialogAlerDeleteCuenta">
                <p class="subheading">Indique su contraseña para eliminar la cuenta</p>
                <v-text-field
                v-model="supposedPasswordToDelete" 
                class="input" 
                :type="showSupposedPasswordToDelete ? 'text' : 'password'"
                :append-icon="showSupposedPasswordToDelete ? 'visibility' : 'visibility_off'"
                :error-messages="errors.supposedPasswordToDelete"
                label="Contraseña"
                @click:append="showSupposedPasswordToDelete = !showSupposedPasswordToDelete"
                ></v-text-field>
                <v-btn block dark color="black" @click="dialogs.passwordToDeleteCuenta = false">cancelar</v-btn>
                <v-btn block dark color="red darken-3" :loading="loading" @click="deleteCuenta">eliminar cuenta<v-icon class="ml-2">fas fa-exclamation-triangle</v-icon></v-btn>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'cuenta',
    data() {
        return {
            supposedPassword: null,
            newPassword: null,
            supposedPasswordToDelete: null,
            showSupposedPassword: false,
            showNewPassword: false,
            showSupposedPasswordToDelete: false,
            mobile: true,
            breakpoint: this.$vuetify.breakpoint,
            errors: {
                supposedPassword: null,
                newPassword: null,
                supposedPasswordToDelete: null,
            },
            dialogs: {
                passwordChanged: false,
                confirmDeleteCuenta: false,
                passwordToDeleteCuenta: false
            },
            loading: false
        }
    },
    created() {
        axios.defaults.headers.common['token'] = this.$store.state.token
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
    },
    computed: {
        ...mapGetters(['userLoginStore'])
    },
    methods: {
        ...mapMutations(['logout']),
        validarPassword() {
            this.errors.supposedPassword = null
            this.errors.newPassword = null
            let errorSupposedPassword = false,
            errorNewPassword = false

            if (this.supposedPassword === null || this.supposedPassword === undefined || this.supposedPassword === '') {
                this.errors.supposedPassword = 'Contraseña obligatoria'
                errorSupposedPassword = true
            }

            if (this.supposedPassword === null || this.supposedPassword === undefined || this.supposedPassword === '') {
                this.errors.newPassword = 'Contraseña obligatoria'
                errorNewPassword = true
            }

            if (errorSupposedPassword || errorNewPassword) {
                return false
            } else {
                return true
            }
        },
        changePassword() {
            let validPassword = this.validarPassword()
            if (validPassword) {
                let body = {
                    supposedPassword: this.supposedPassword,
                    newPassword: this.newPassword
                }

                body = qs.stringify(body)

                axios.post(`${ this.$store.state.urlBackend }/usuarios/${ this.userLoginStore._id }/change-password`, body)
                    .then((res) => {
                        console.log(res)
                        this.dialogs.passwordChanged = true
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            }
        },
        afterChangePassword() {
            this.dialogs.passwordChanged = false
            this.logout()
            this.$router.push('/login')
        },
        deleteCuenta() {
            this.errors.supposedPasswordToDelete = null

            if (this.supposedPasswordToDelete === null || this.supposedPasswordToDelete === undefined || this.supposedPasswordToDelete === '') {
                this.errors.supposedPasswordToDelete = 'Contraseña obligatoria'
                return
            }

            this.loading = true
            // let data = qs.stringify({ data: {supposedPassword: this.supposedPasswordToDelete} })

            axios.delete(`${ this.$store.state.urlBackend }/usuarios/${ this.userLoginStore._id }`, { data: {supposedPassword: this.supposedPasswordToDelete} })
                .then((res) => {
                    console.log(res)
                    this.loading = false
                })
                .catch((err) => {
                    console.log(err.response)
                    this.loading = false
                })
        }
    }
}
</script>

<style scoped>
    .containerGrid {
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: 100%;
    }
    .titlePassword, .titleCuenta {
        justify-self: center;
    }
    .label {
        display: none;
    }
    .btnChangePassword {
        justify-self: end;
    }
    .cardDialogAlertPasswordChanged {
        padding: 2rem;
    }
    .titleCuenta {
        margin-top: 2rem;
    }
    .cardDialogAlerDeleteCuenta {
        padding: 2rem;
    }

    @media (min-width: 960px) {
        .containerGrid {
            grid-template-columns: 40% 45% 15%;
        }
        .titlePassword, .titleCuenta {
            grid-column: 1 / 4;
            align-self: center;
        }
        .label {
            display: inline;
            grid-column: 1;
            align-self: center;
            justify-self: end;
            margin-right: 4rem;
        }
        .input {
            grid-column: 2;
        }
        .btnChangePassword {
            grid-column: 1 / 3;
            justify-self: end;
        }
        .btnDelete {
            grid-column: 1 / 4;
        }
    }
</style>
