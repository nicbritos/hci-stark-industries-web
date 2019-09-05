<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <Device :device="item"></Device>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Device from "@/components/individuals/Device";
export default {
  name: "DeviceContainer",
  components: { Device },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
