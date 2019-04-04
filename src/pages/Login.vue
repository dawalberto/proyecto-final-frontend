<template>
    <div>
        <input type="text" id="email" placeholder="email">
        <input type="password" id="password" placeholder="password">
        <button @click="login">login</button>
    </div>
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
