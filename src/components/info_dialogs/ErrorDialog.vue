<template>
  <v-dialog v-model="errorDialog" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark >Error</v-btn>
    </template>
    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="2">
            <v-icon color="red" x-large>error</v-icon>
          </v-col>
          <v-col md="10">
            <span class="subtitle-1">{{ message }}</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="blue" @click="errorDialog = false">OK</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",
  props: ["name", "message"],
  data() {
    return {
      errorDialog: false
    };
  }
};
</script>

<style scoped></style>
