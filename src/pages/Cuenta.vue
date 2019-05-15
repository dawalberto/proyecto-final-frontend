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

        <label for="inputNewPasswordRepeat" class="label">REPETIR NUEVA CONTRASEÑA</label>
        <v-text-field 
        id="inputNewPasswordRepeat" 
        v-model="newPasswordRepeat" 
        class="input" 
        :type="showNewPasswordRepeat ? 'text' : 'password'"
        :append-icon="showNewPasswordRepeat ? 'visibility' : 'visibility_off'"
        :error-messages="errors.newPasswordRepeat"
        :label="mobile ? 'Repetir nueva contraseña' : ''"
        @click:append="showNewPasswordRepeat = !showNewPasswordRepeat">
        </v-text-field>

        <v-btn 
            :block="mobile" 
            :loading="loadingChangePassword" 
            :disabled="loadingChangePassword" 
            :dark="!loadingChangePassword" 
            @click="changePassword" 
            class="btnChangePassword" 
            color="blue darken-3"
        >
            cambiar contraseña
            <v-icon class="ml-2">fas fa-sync-alt</v-icon>
        </v-btn>

        <v-dialog v-model="dialogs.passwordChanged" persistent max-width="500">
            <v-card class="cardDialogAlertPasswordChanged" color="grey lighten-3">
                <p class="subheading">Contraseña actualizada correctamente. A continuación será redirigido/a a la pantalla de inicio de sesión</p>
                <v-btn block dark color="blue darken-3" @click="afterChangePassword">aceptar</v-btn>
            </v-card>
        </v-dialog>
        
        <p class="titleCuenta subheading font-weight-bold">ELIMINAR CUENTA</p>
        <v-btn @click="dialogs.confirmDeleteCuenta = true" class="btnDelete" :block="mobile" dark color="red darken-3">eliminar cuenta<v-icon class="ml-2">fas fa-exclamation-triangle</v-icon></v-btn>

        <v-dialog v-model="dialogs.confirmDeleteCuenta" max-width="500">
            <v-card class="cardDialogAlerDeleteCuenta">
                <p class="subheading">¿Está useted seguro/a de que desea eliminar su cuenta?</p>
                <p class="subheading">En caso de eliminarla no podrá volver a entrar con esta cuenta y todos sus conciertos y programas serán eliminados de forma permanente.</p>
                <v-btn block dark color="black" @click="dialogs.confirmDeleteCuenta = false">cancelar</v-btn>
                <v-btn 
                    :loading="loading" 
                    :disabled="loading"
                    :dark="!loading" 
                    block 
                    color="red darken-3" 
                    @click="dialogs.passwordToDeleteCuenta = true"
                >
                    eliminar
                </v-btn>
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
                <v-btn block dark color="black" @click="cancelDialogPasswordToDelete">cancelar</v-btn>
                <v-btn 
                    :loading="loading" 
                    :disabled="loading" 
                    :dark="!loading"
                    @click="deleteCuenta"
                    color="red darken-3" 
                    block 
                >
                    eliminar cuenta
                    <v-icon class="ml-2">fas fa-exclamation-triangle</v-icon>
                </v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogs.alertCuentaDeleted" max-width="500">
            <v-card class="cardDialogAlertCuentaDeleted">
                <p class="subheading">Cuenta eliminada correctamente</p>
                <v-btn block dark color="blue darken-3" @click="afterCuentadeleted">aceptar</v-btn>
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
            newPasswordRepeat: null,
            supposedPasswordToDelete: null,
            showSupposedPassword: false,
            showNewPassword: false,
            showNewPasswordRepeat: false,
            showSupposedPasswordToDelete: false,
            mobile: true,
            breakpoint: this.$vuetify.breakpoint,
            errors: {
                supposedPassword: null,
                newPassword: null,
                newPasswordRepeat: null,
                supposedPasswordToDelete: null
            },
            dialogs: {
                passwordChanged: false,
                confirmDeleteCuenta: false,
                passwordToDeleteCuenta: false,
                alertCuentaDeleted: false
            },
            loading: false,
            loadingChangePassword: false
        }
    },
    created() {
        axios.defaults.headers.common['token'] = this.$store.state.token
    },
    mounted() {
        this.breakpoint.smAndDown ? this.mobile = true : this.mobile = false
        this.$store.commit('pageIsMounted')        
    },
    computed: {
        ...mapGetters(['userLoginStore'])
    },
    methods: {
        ...mapMutations(['logout']),
        validarPassword() {
            this.errors.supposedPassword = null
            this.errors.newPassword = null
            this.errors.newPasswordRepeat = null
            let errorSupposedPassword = false,
            errorNewPassword = false,
            errorNewPasswordRepeat = false

            if (this.supposedPassword === null || this.supposedPassword === undefined || this.supposedPassword === '') {
                this.errors.supposedPassword = 'Contraseña obligatoria'
                errorSupposedPassword = true
            }

            if (this.newPassword === null || this.newPassword === undefined || this.newPassword === '') {
                this.errors.newPassword = 'Contraseña obligatoria'
                errorNewPassword = true
            }

            if (this.newPasswordRepeat === null || this.newPasswordRepeat === undefined || this.newPasswordRepeat === '') {
                this.errors.newPasswordRepeat = 'Contraseña obligatoria'
                errorNewPasswordRepeat = true
            }

            if (this.newPassword !== this.newPasswordRepeat) {
                this.errors.newPassword = 'Las contraseñas deben coincidir'
                this.errors.newPasswordRepeat = 'Las contraseñas deben coincidir'
                errorNewPasswordRepeat = true
            }


            if (errorSupposedPassword || errorNewPassword || errorNewPasswordRepeat) {
                return false
            } else {
                return true
            }
        },
        changePassword() {
            let validPassword = this.validarPassword()
            if (validPassword) {
                this.loadingChangePassword = true

                let body = {
                    supposedPassword: this.supposedPassword,
                    newPassword: this.newPassword
                }

                body = qs.stringify(body)

                axios.post(`${ this.$store.state.urlBackend }/usuarios/${ this.userLoginStore._id }/change-password`, body)
                    .then((res) => {
                        this.dialogs.passwordChanged = true
                        this.loadingChangePassword = false
                    })
                    .catch((err) => {
                        this.errors.supposedPassword = 'Contraseña incorrecta'
                        this.loadingChangePassword = false
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
                    // console.log(res)
                    this.loading = false
                    this.dialogs.alertCuentaDeleted = true
                })
                .catch((err) => {
                    // console.log(err.response)
                    this.errors.supposedPasswordToDelete = 'Contraseña incorrecta'
                    this.loading = false
                })
        },
        afterCuentadeleted() {
            this.logout()
            this.$router.push('/') 
        },
        cancelDialogPasswordToDelete() {
            this.dialogs.passwordToDeleteCuenta = false  
            this.dialogs.confirmDeleteCuenta = false
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
    .btnChangePassword, .btnDelete {
        justify-self: end;
    }
    .cardDialogAlertPasswordChanged, .cardDialogAlerDeleteCuenta, .cardDialogAlertCuentaDeleted {
        padding: 2rem;
    }
    .titleCuenta {
        margin-top: 2rem;
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
        .btnChangePassword, .btnDelete {
            grid-column: 1 / 3;
            justify-self: end;
        }
    }
</style>
