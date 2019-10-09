<template>
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
      <v-btn icon v-blur text>
        <v-icon>
          more_horiz
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        large
        icon
        v-blur
        text
        color="primary"
        @click="UpdateFavoriteState()"
      >
        <v-icon large v-if="routine.meta.favourited">favorite</v-icon>
        <v-icon large v-else>favorite_outline</v-icon>
      </v-btn>
      <v-btn large icon v-blur @click="Execute()">
        <v-icon large color="primary">play_circle_outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
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
  methods: {
    async Execute() {
      console.log("Executing Routine: " + this.routine.name);
      await apiWrapper.routines.execute(this.routine.id);
    },
    async UpdateFavoriteState() {
      let data = {
        name: this.routine.name,
        actions: this.routine.actions,
        meta: this.routine.meta
      };

      data.meta.favourited = !data.meta.favourited;
      this.routine.meta.favourited = data.meta.favourited;

      await apiWrapper.routines.update(this.routine.id, data);
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
