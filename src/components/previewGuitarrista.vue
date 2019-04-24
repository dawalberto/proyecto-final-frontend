<template>
    <a :href="urlToUser" :title="guitarristaProp.nombre" v-if="guitarristaProp.nombre">
        <v-card hover width="100%" id="card">
            <v-container fill-height>
                <v-layout row wrap align-center>
                    <v-flex class="text-xs-center">
                        <v-avatar size="100" color="#EEEEEE" class="elevation-10">
                            <img :src="imgUser" alt="" id="imgUser" loading="lazy">
                        </v-avatar>
                    </v-flex>
                </v-layout>
            </v-container>
            <p class="headline font-weight-light text-xs-center greyColorBlueDarken4">{{ guitarristaProp | shortNom }}</p>
            <hr class="hrColor">
            <p class="font-weight-light subheading mt-3 colorGreyDarken greyColorBlueDarken1">{{ guitarristaProp | shortBiografia }}</p>
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
    filters: {
        shortBiografia(value) {
            if (value.biografia) {
                return `${ value.biografia.substring(0, 200) }...`
            }
        },
        shortNom(value) {
            if (value.nombre) {
                if (value.apellidos) {
                    let firstApe = value.apellidos.split(' ')[0]
                    return `${ value.nombre } ${ firstApe }`
                } else {
                    return value.nombre
                }
            }
        }
    }
}
</script>

<style scoped>
    #card {
        padding: 2rem;
    }
    .hrColor {
        background-image: linear-gradient(90deg, #78909C, transparent);
        border: 0;
        height: 1px;
    }
    .colorGreyDarken {
        color: #616161;
    }
    .greyColorBlueDarken1 {
        color: #546E7A;
    }
    .greyColorBlueDarken4 {
        color: #263238;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        #imgCard {
            opacity: 0.9;

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
