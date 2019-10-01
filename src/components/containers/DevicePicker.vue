<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <Device
          :editable="false"
          :room="room"
          :device="item"
          @click="onPick(item)"
        ></Device>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Device from "@/components/individuals/Device";
export default {
  name: "DevicePicker",
  model: {
    events: ["pick"]
  },
  components: { Device },
  props: {
    items: {
      type: Array,
      required: true
    },
    room: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onPick(item) {
      this.$emit("pick", item);
    }
  }
};
</script>

<style scoped></style>
