<template>
    <div>
        <button @click="login">login</button>
    </div>
</template>

<script>
/* eslint-disable */

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
            let user = {
                email: 'front@front.com',
                password: '123456'
            }
            axios.post('http://192.168.56.101:3000/login', qs.stringify(user))
                .then( (res) => { console.log(res.data) } )
                .catch( (err) => { console.log(err) } )
        }
    }
}
</script>

<style scoped>

</style>
