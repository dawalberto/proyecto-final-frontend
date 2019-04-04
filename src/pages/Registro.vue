<template>
    <div>
        <input type="text" id="email" placeholder="email">
        <input type="text" id="nomUsuario" placeholder="nomUsuario">
        <input type="password" id="password" placeholder="password">
        <button @click="registrar">registrar</button>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
    name: 'registro',
    data () {
        return {
            
        }
    },
    methods: {
        registrar () {
            let email = document.querySelector('#email').value
            let password = document.querySelector('#password').value
            let nomUsuario = document.querySelector('#nomUsuario').value

            let newUser = {
                email,
                password,
                nomUsuario
            }

            axios.post(`${ this.$store.state.urlBackend }/usuarios`, qs.stringify(newUser))
                .then(res => console.log(res.data))
                .catch(err => console.log(err.data))
        }
    }
}
</script>

<style scoped>

</style>
