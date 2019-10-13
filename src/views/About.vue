<template
  ><v-container grid-list-md>
  <v-card>
      <v-card-title>
        <h2>
          About
        </h2>
      </v-card-title>
      <v-card-text>
        This website is a group project for HCI. 2019 Q2
      </v-card-text>


      <v-card-text>
        Created by: Nicolas Ignacio Britos, Lucas Dell'Isola and Juan Martin Oliva
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import routes from "@/router/routes";
  export default {
    name: "About",
    components: {  },
    data: () => ({
      snackbar: false,
      loading: false,

    }),
    mounted() {
      this.breadcrumbs[0].disabled = true;
    }
  };
</script>
