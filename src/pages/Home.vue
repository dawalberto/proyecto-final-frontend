<template>
    <div>
        <p class="subheading">clasicaguitarra.com</p>
        <div class="conciertosSemana">

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'home',
    data() {
        return {
            conciertosWeek: []
        }
    },
    mounted() {
        this.getConciertosThisWeek()
    },
    methods: {
        getConciertosThisWeek() {
            axios.get(`${ this.$store.state.urlBackend }/conciertos/this/week`)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

}
</script>

<style scoped>

</style>
