<template>
    <v-card>
        <v-img
            src="https://cdn.pixabay.com/photo/2017/03/13/20/48/guitar-2141119_960_720.jpg"
            alt="img"
            aspect-ratio="2.75"
        >


        <v-container fill-height fluid>
        <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
                <v-avatar size="80" color="brown">
                    <img :src="imgUser" alt="">
                </v-avatar>
            </v-flex>
        </v-layout>
        </v-container>

        </v-img>

        <v-card-title primary-title>
            <div>
                {{ conciertoObj.titulo }}
            </div>
        </v-card-title>

        <!-- <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'previewConcierto',
    props: ['conciertoObj'],
    data() {
        return {
            imgUser: null
        }
    },
    mounted() {
        this.getImage()
    },
    methods: {
        getImage() {
            let self = this

            axios.get(`${ this.$store.state.urlBackend }/imagenes/imgusuarios/${ this.conciertoObj.usuario.img }`, {
                responseType: 'blob'
            })
                .then((res) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(res.data)
                    reader.onload = function() {
                        let url = reader.result
                        self.imgUser = url
                    }
                })
                .catch((err) => {
                    console.log('error imagen ', err)
                })
        }
    }
}
</script>

<style scoped>

</style>
