<template>
    <div>
        <p class="title font-weight-light">clasicaguitarra.com es un proyecto que nace a causa del gran desconocimiento que hay con respecto a la guitarra clásica y música clásica en general en España, sobre todo entre los/las más jovenes.</p>
        <p class="title font-weight-light">El objetivo de la web es conseguir un punto de referencia(la web) donde se pueda encontrar a cualquier guitarrsita clásico/a e información sobre el/ella y sus conciertos, recopilando en un único lugar un gran cúmulo de información disponible para todos los usuarios de la web y muy fácil de hacer llegar a otros usuarios.</p>
        <p class="title font-weight-light">clasicaguitarra.com es una web completamente gratuita que pretende ayudar a los/las guitarristas clásicos/as dandolos a conocer a ellos/ellas y sus conciertos a través de internet.</p>
        <hr class="mt-4">
        <p class="title font-weight-light mt-2">Si te gusta clasicaguitarra.com o disfrutas de sus servicios y te gustaría ayudar a mantenerla, puedes considerar hacer una donación a través de PayPal, tú eliges el precio.</p>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value="albertoelmonociclista@gmail.com" />
            <input type="hidden" name="item_name" value="Mantener clasicaguitarra.com" />
            <input type="hidden" name="currency_code" value="EUR" />
            <!-- <input type="image" src="http://mbkinc.org/wp-content/uploads/2017/10/paypal-donate-button-high-quality-png.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Botón Donar con PayPal" /> -->
            <!-- <v-btn color="#FFAA28" round name="submit" type="submit"><span style="color: #00174F;">Donar</span></v-btn> -->
            <v-btn color="transparent" flat name="submit" type="submit" title="PayPal - The safer, easier way to pay online!" alt="Botón Donar con PayPal">
                <img src="http://mbkinc.org/wp-content/uploads/2017/10/paypal-donate-button-high-quality-png.png" width="350" />
            </v-btn>
            <!-- <img alt="" border="0" src="https://www.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1" /> -->
        </form>
    </div>
</template>

<script>
export default {
    name: 'donate',
    mounted() {
      this.$store.commit('pageIsMounted')      
    },
}
</script>

<style scoped>

</style>
