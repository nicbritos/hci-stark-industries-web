<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <Room :room="item"></Room>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Room from "@/components/individuals/Room";
export default {
  name: "RoomContainer",
  components: { Room },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
