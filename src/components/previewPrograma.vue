<template>
    <v-card class="cardVistaPrevia" color="grey lighten-5">
        <p v-show="!obrasObj" class="headline msgSinPrograma">El autor del concierto no ha creado ningún programa para este concierto</p>
        <template v-for="obra of obrasObj">
            <span class="obra subheading font-weight-light brown--text"><v-icon class="mr-2" color="brown lighten-1">fas fa-music</v-icon>{{ obra.obra }}</span>
            <span class="compositor subheading font-weight-light brown--text"><v-icon class="mr-2" color="brown lighten-1">fas fa-user</v-icon>{{ obra.compositor }}</span>
            <hr class="hrVistaPrevia">
        </template>
    </v-card>
</template>

<script>
export default {
    name: 'previewPrograma',
    props: ['obrasObj'],
    data() {
        return {

        }
    }
}
</script>

<style scoped>
  .cardVistaPrevia {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 100fr;
    padding: 2rem;
  }
  .obra {
    align-self: center;
    text-align: left;
  }
  .compositor {
    align-self: center;
    text-align: right;
  }
  .hrVistaPrevia {
    border: none;
    background-color: #D7CCC8;
    height: 1px;
  }

  @media (min-width: 960px) {
    .cardVistaPrevia {
      grid-template-columns: 50fr 50fr;
    }
    .obra {
      grid-column: 1;
      text-align: left;
      margin-left: 13rem;
    }
    .compositor {
      grid-column: 2;
      text-align: left;
      margin-left: 13rem;
    }
    .hrVistaPrevia {
      grid-column: 1 / 3;
    }
    .msgSinPrograma {
      grid-column: 1 / 3;
    }
  }
</style>

