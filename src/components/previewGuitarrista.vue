<template>
    <a :href="urlToUser" :title="guitarristaProp.nombre">
        <v-card hover width="100%" id="card">
            <!-- <v-img
            id="imgCard"
            :src="require('@/assets/logo-proyecto.png')"
            alt="img"
            loading="lazy"
            aspect-ratio="2.75"
            > -->
                <v-container fill-height>
                    <v-layout row wrap align-center>
                        <v-flex class="text-xs-center">
                            <v-avatar size="150" color="#EEEEEE" href="123">
                                <img :src="imgUser" alt="" id="imgUser" loading="lazy">
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-container>
            <!-- </v-img> -->
            <p class="headline font-weight-light text-xs-center">{{ nomGuitarrista }}</p>
            <hr color="lightgrey">
            <p class="font-weight-light subheading mt-3">{{ shortBiografia }}</p>
        </v-card>
    </a>
</template>

<script>
export default {
    name: 'previewGuitarra',
    props: ['guitarristaProp'],
    data() {
        return {
            imgUser: null,
            urlToUser: `#/perfil/${ this.guitarristaProp._id }`,
        }
    },
    mounted() {
        this.$store.dispatch('getImage', this.guitarristaProp.img)
            .then(img => this.imgUser = img)
            .catch(err => console.log('ERROR getImage previewConcierto.vue', err))
    },
    computed: {
        shortBiografia() {
            return `${ this.guitarristaProp.biografia.substring(0, 200) }...`
        },
        nomGuitarrista() {
            let firstApe = this.guitarristaProp.apellidos.split(' ')[0]
            return `${ this.guitarristaProp.nombre } ${ firstApe }`
        }
    }
}
</script>

<style scoped>
    #card {
        padding: 2rem;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        #imgCard {
            opacity: 0.9;

            /* -webkit-transform: rotate(-180deg);
            -moz-transform: rotate(-180deg);
            -o-transform: rotate(-180deg);
            -ms-transform: rotate(-180deg);
            transform: rotate(-180deg); */

            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            -ms-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
        #card:hover > #imgCard {
            opacity: 1;

            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
</style>
