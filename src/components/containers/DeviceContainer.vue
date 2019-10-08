<template>
  <BoxContainer :items="items">
    <template v-slot:item="{ item }">
      <Device
        :editable="editable"
        :selectable="selectable"
        :room="room"
        :device="item"
        @update="processSelection(item, $event)"
        @click="processClick(item)"
        v-on:reload="propagateReload"
      ></Device>
    </template>
  </BoxContainer>
</template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Device from "@/components/individuals/Device";

export default {
  name: "DeviceContainer",
  components: { Device, BoxContainer },
  model: {
    events: ["pick"]
  },
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
    pick: {
      type: Boolean,
      required: false,
      default: false
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
    },
    processClick(item) {
      if (this.pick) this.$emit("pick", item);
      else console.log("Open its menu");
    },
    propagateReload(){
      console.log("Propagating");
      this.$emit('reload')
    }
  },
  mounted() {
    console.log("En DEVICE CONTAINER")
  }
};
</script>

<style scoped></style>
