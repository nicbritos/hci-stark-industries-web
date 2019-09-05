<template>
  <v-card hover style="cursor: default" width="200">
    <v-card-text v-ripple style="cursor: pointer">
      <div class="text--secondary">
        {{ device.name }} from {{ device.room.name }}
      </div>

      <v-container fluid>
        <v-row align="start" justify="center">
          <v-img
            max-height="100"
            max-width="100"
            :src="device.type.image"
          ></v-img>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="mt-n8 pb-0">
      <v-spacer></v-spacer>
      <v-btn icon v-blur text color="primary">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-switch class="mt-5 ml-4" v-model="device.on" v-blur color="primary">
      </v-switch>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Routine",
  props: {
    device: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
