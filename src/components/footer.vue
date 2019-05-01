<template>
    <div class="footer bg-blue-grey-darken-4">
        <div class="section1">
            <div class="newsletter col1-2">
                <p class="headline font-weight-light">Newsletter</p>
                <p class="font-weight-light">No te pierdas ningún concierto!</p>
                <v-text-field
                    label="email"
                    solo
                ></v-text-field>
                <v-btn class="ml-0 mt-0" color="white">Suscribirme</v-btn>
            </div>
            <div class="contact">
                <p class="headline font-weight-light">Contacto</p>
                <p class="font-weight-light blue-grey-lighten-4 mb-0">EMAIL</p>
                <p>clasicaguitarra.com.email@gmail.com</p>
            </div>
        </div>
        <div class="section2 mt-4">
            <p class="col1 text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-guitar</v-icon>GUITARRISTAS</p>
            <p class="col2 text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-music</v-icon>CONCIERTOS</p>
            <p class="col3 text-xs-center font-weight-light"><v-icon class="mr-2" dark>fas fa-sign-in-alt</v-icon>LOGIN</p>
            <hr class="separatorHr col1-3">
            <p class="col1 text-xs-center font-weight-light"><a href="">Terms of Use</a> <a href="" class="ml-2">Privavy Policy</a></p>
            <p class="col2 text-xs-center font-weight-light">&copy; Copyright clasicaguitarra.com 2019</p>
            <p class="redes col3 text-xs-center">
                <a href=""><v-icon color="#CFD8DC">fab fa-twitter</v-icon></a>
                <a href="" class="ml-4"><v-icon color="#CFD8DC">fab fa-facebook</v-icon></a>
                <a href="" class="ml-4"><v-icon color="#CFD8DC">fab fa-youtube</v-icon></a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .bg-blue-grey-darken-4 {
        background-color: #263238;
    }
    .bg-blue-grey-darken-1 {
        background-color: #546E7A;
    }
    .blue-grey-lighten-4 {
        color: #CFD8DC;
    }
    .footer {
        color: white;
    }
    .section1, .section2 {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: 100fr;
        padding: 2rem;
        justify-content: center;
    }
    .separatorHr {
        border: none;
        margin: 0 6rem;
        background-color: #B0BEC5;
        height: 1px;
    }
    a {
        text-decoration: none;
    }

    @media (min-width: 960px) {
        .section1, .section2 {
            grid-template-columns: 30% 30% 30%;
        }
        .col1 {
            grid-column: 1;
        }
        .col2 {
            grid-column: 2;
        }
        .col3 {
            grid-column: 3;
        }
        .col1-2 {
            grid-column: 1 / 3;
        }
        .col1-3 {
            grid-column: 1 / 4;
        }
        .newsletter {
            padding-right: 8rem;
        }
    }
</style>
