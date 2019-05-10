<template>
    <div class="containerTerms">
        <div class="container">
            <p class="title">Responsable</p>
            <p>clasicaguitarra</p>
            <p>Contacto: clasicaguitarra.com.admin@gmail.com</p>

            <p class="title">¿Qué se hace con tus datos?</p>
            <p>• Nuevos clientes</p>
            <p>
                La principal finalidad de dicho tratamiento es la gestión de los usuarios registrados en nuestra web, así como el envío de avisos relativo 
                a los productos y servicios de clasicaguitarra.com o para el envío de información y servicios de otras entidades.
                clasicaguitarra asegura la confidencialidad de los datos aportados y garantiza que, en ningún caso, serán cedidos para ningún otro uso sin mediar 
                consentimiento previo y expreso de nuestros usuarios. Sólo le pediremos aquellos datos necesarios para la prestación del servicio requerido y 
                únicamente serán empleados para este fin.
            </p>
            <p>• Newsletter o suscripción a guitarrista</p>
            <p>El e-mail facilitado será objeto de tratamiento por parte de clasicaguitarra con la finalidad de enviar información sobre los conciertos o novedades de clasicaguitarra.com.</p>

            <p class="title">Derechos de los interesados</p>
            <p> El interesado tiene los siguientes derechos:</p>
            <ul>
                <li>Podrá solicitar información sobre los datos de carácter personal almacenados que le conciernan.</li>
                <li>Podrá solicitar que se corrija la inexactitud de sus datos personales.</li>
                <li>Podrá solicitar la eliminación de sus datos personales.</li>
            </ul>
            <p>Para ello deberá dirigirse a nuestro correo clasicaguitarra.com.admin@gmail.com</p>

            <p class="title">Redes sociales</p>
            <p>
                A través de nuestra página web puede acceder a las redes sociales Facebook, Twitter o Youtube de acceso abierto a todos los usuarios. 
                Se trata de sitios web donde el usuario puede registrase y seguirnos gratuitamente. En estas redes sociales los usuarios podrán conocer de nuestras actividades, 
                opiniones, acceder a las fotos y vídeos. Los usuarios de estas redes sociales deben ser conscientes de que este lugar es independiente de la web 
                clasicaguitarra.com y está abierto, es decir, es visible para todos sus usuarios, y las políticas de privacidad a aplicar a estos contenidos 
                son las fijadas por Facebook, Twitter o Youtube. clasicaguitarra.com no es titular de las redes sociales.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'privacy-policy',
    mounted() {
        this.$store.commit('pageIsMounted')        
    },
}
</script>
<style scoped>
    .title {
        color: #37474F;
    }
    p, li {
        color: #455A64;
    }
    ul {
        margin-bottom: 1rem;
    }

    @media (min-width: 960px) {
        .container {
            padding: 0 12rem;
        }
    }
</style>
