<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <Routine :routine="item"></Routine>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "@/components/individuals/Routine";
export default {
  name: "RoutineContainer",
  components: { Routine },

  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
