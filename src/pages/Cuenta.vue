<template>
    <div class="containerGrid">
        <p class="titlePassword subheading">CAMBIAR CONTRASEÑA</p>
        <label for="inputCurrentPassword" class="label">CONTRASEÑA ACTUAL</label>
        <v-text-field 
        id="inputCurrentPassword" 
        v-model="supposedPassword" 
        class="input" 
        :type="showSupposedPassword ? 'text' : 'password'"
        :append-icon="showSupposedPassword ? 'visibility' : 'visibility_off'"
        :error-messages="error.supposedPassword"
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
        :error-messages="error.newPassword"
        :label="mobile ? 'Nueva contraseña' : ''"
        @click:append="showNewPassword = !showNewPassword">
        </v-text-field>
        <v-btn dark @click="changePassword" class="btnChangePassword" color="grey darken-3">cambiar</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapGetters } from 'vuex'

export default {
    name: 'cuenta',
    data() {
        return {
            supposedPassword: null,
            newPassword: null,
            showSupposedPassword: false,
            showNewPassword: false,
            mobile: true,
            breakpoint: this.$vuetify.breakpoint,
            error: {
                supposedPassword: null,
                newPassword: null
            }
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
        validarPassword() {
            this.error.supposedPassword = null
            this.error.newPassword = null
            let errorSupposedPassword = false,
            errorNewPassword = false

            if (this.supposedPassword === null || this.supposedPassword === undefined || this.supposedPassword === '') {
                this.error.supposedPassword = 'Contraseña obligatoria'
                errorSupposedPassword = true
            }

            if (this.supposedPassword === null || this.supposedPassword === undefined || this.supposedPassword === '') {
                this.error.newPassword = 'Contraseña obligatoria'
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
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            }
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
    .titlePassword, .btnChangePassword {
        justify-self: center;
    }
    .label {
        display: none;
    }

    @media (min-width: 960px) {
        .containerGrid {
            grid-template-columns: 40% 45% 15%;
        }
        .titlePassword {
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
            grid-column: 1 / 4;
        }
    }
</style>
