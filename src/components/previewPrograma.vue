<template>
    <v-card class="cardVistaPrevia" dark>
        <template v-for="obra of obrasObj">
            <span class="obra subheading"><v-icon class="mr-2">fas fa-music</v-icon>{{ obra.obra }}</span>
            <span class="compositor subheading"><v-icon class="mr-2">person</v-icon>{{ obra.compositor }}</span>
            <hr class="hrVistaPrevia" color="grey">
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
    height: 1px;
  }

  @media (min-width: 960px) {
    .cardVistaPrevia {
      grid-template-columns: 50fr 50fr;
    }
    .obra {
      grid-column: 1;
      text-align: left;
      margin-left: 10rem;
    }
    .compositor {
      grid-column: 2;
      text-align: left;
      margin-left: 10rem;
    }
    .hrVistaPrevia {
      grid-column: 1 / 3;
    }
  }
</style>

