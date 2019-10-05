<template>
  <v-snackbar v-model="undo_window" :timeout="3000" color="blue">
    <span>{{ message }}</span>
    <v-btn @click="undo = true" color="red">Undo</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "undo",
  props: ["message"],
  data() {
    return {
      undo_window: true,
      undo: false
    };
  }
};
</script>

<style scoped></style>
