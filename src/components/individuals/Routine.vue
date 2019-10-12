<template>
  <v-container>
    <v-snackbar v-model="openSnackbar" :timeout="5000">
      The routine {{this.routine.name}} is beign excecuted
      <v-btn
              color="blue"
              text
              @click="openSnackbar = false"
      >
        Dismiss
      </v-btn>
    </v-snackbar>
  <v-card hover style="cursor: default" width="350">
    <v-card-text v-ripple style="cursor: pointer">
      <p class="display-1 text--primary">
        {{ routine.name }}
      </p>
      <div class="text--secondary">
        {{
          routine.meta.description != null
            ? routine.meta.description
            : "No description set"
        }}<br />
      </div>
    </v-card-text>
    <v-card-actions class="mt-n4">
      <v-spacer></v-spacer>
      <v-btn
        large
        icon
        v-blur
        text
        color="primary"
        @click="UpdateFavoriteState()"
      >
        <v-icon large v-if="routine.meta.favourite">favorite</v-icon>
        <v-icon large v-else>favorite_outline</v-icon>
      </v-btn>
      <v-btn large icon v-blur @click="Execute()">
        <v-icon large color="primary">play_circle_outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>
import apiWrapper from "../../data/apiWrapper";
export default {
  name: "Routine",
  props: {
    routine: {
      type: Object,
      required: true
    }
  },
  data: ()=>({
    openSnackbar:false,
  }),
  methods: {
    async Execute() {
      console.log("Executing Routine: " + this.routine.name);
      this.openSnackbar = true;
      await apiWrapper.routines.execute(this.routine.id);

    },
    async UpdateFavoriteState() {
      let data = {
        name: this.routine.name,
        actions: this.routine.actions,
        meta: this.routine.meta
      };

      data.meta.favourite = !data.meta.favourite;
      this.routine.meta.favourite = data.meta.favourite;

      await apiWrapper.routines.update(this.routine.id, data);
      console.log("Forcing to reload site");
      this.$emit("reload-site");
    }
  },
  mounted() {
    console.log("Cargando RUTINA");
    console.log(this.routine);
  }
};
</script>

<style scoped></style>
