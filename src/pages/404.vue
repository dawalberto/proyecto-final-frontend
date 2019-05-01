<template>
    <div>
        <p class="display-4 font-weight-light text-xs-center">404 :(</p>
        <p class="subheading font-weight-light text-xs-center">El recurso solicitado no existe</p>
    </div>
</template>

<script>
export default {
    name: 'page404',
    mounted() {
        this.$store.commit('pageIsMounted')        
    },
}
</script>

<style scoped>

</style>