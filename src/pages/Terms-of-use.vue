<template>
    <div class="containerTerms">
        <div class="container">
            <p class="title">Términos</p>
            <p>
                Al acceder al sitio web clasicaguitarra.com, usted acepta estar vinculado por estos términos de servicio, todas las leyes y regulaciones aplicables, y 
                acepta que usted es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, se le prohíbe utilizar 
                o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas aplicables.
            </p>

            <p class="title">Usuarios</p>
            <p>El acceso y/o uso de este portal atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso, los Termins de uso aquí reflejados.</p>

            <p class="title">Propiedad</p>
            <p>
                Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad  
                de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan  sin ningún tipo de garantía, 
                expresa o implícita. En ningún esta compañía será  responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, 
                fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.
            </p>

            <p class="title">Uso del portal</p>
            <p>
                clasicaguitarra.com proporciona el acceso a multitud de servicios, informaciones o datos (en adelante, "los contenidos") en Internet 
                pertenecientes a clasicaguitarra, o a terceros a los que el usuario puede tener acceso. El usuario asume la responsabilidad del uso del portal. Dicha responsabilidad 
                se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el usuario será responsable de aportar información veraz y lícita. 
                Como consecuencia de este registro, al usuario se le puede proporcionar una contraseña de la que será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma. 
                El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que clasicaguitarra ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para:
            </p>
            <ul>
                <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
                <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
                <li>
                    Provocar daños en los sistemas físicos y lógicos de clasicaguitarra, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos 
                    o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados;
                </li>
                <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
            </ul>

            <p class="title">Exactitud</p>
            <p>
                Los materiales que aparecen en el sitio web de clasicaguitarra.com pueden incluir errores técnicos, tipográficos o fotográficos. 
                clasicaguitarra.com no garantiza que cualquiera de los materiales en su sitio web son exactos, completos o actuales. 
                clasicaguitarra.com puede realizar cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso. 
                Sin embargo clasicaguitarra.com no se compromete a actualizar los materiales.
            </p>

            <p class="title">Enlaces</p>
            <p>
               clasicaguitarra.com no ha revisado todos los sitios vinculados a su sitio web y no es responsable de los contenidos de dicho sitio vinculado. 
               clasicaguitarra.com puede Agregar vínculo/s o texto al código incrustado. La inclusión de cualquier enlace no implica la aprobación por 
               clasicaguitarra.com del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.
            </p>

            <p class="title">Modificaciones</p>
            <p>
                clasicaguitarra.com puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. 
                Al utilizar este sitio web, usted acepta estar vinculado por la versión actual de estos términos de servicio.
            </p>

            <p class="title">Derecho de exclusión</p>
            <p>
                clasicaguitarra se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin necesidad de preaviso, 
                a instancia propia o de un tercero, a aquellos usuarios que incumplan los Terminos de uso.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'terms-of-use',
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
