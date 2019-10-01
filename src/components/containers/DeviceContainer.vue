<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <Device
          :editable="editable"
          :selectable="selectable"
          :room="room"
          :device="item"
          @update="processSelection(item, $event)"
        ></Device>
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
    },
    room: {
      type: Boolean,
      required: false,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    selectedItems: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    processSelection(item, isSelected) {
      if (isSelected) this.selectedItems.push(item);
      else this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
  }
};
</script>

<style scoped></style>
