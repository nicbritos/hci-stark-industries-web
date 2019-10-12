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
        @favourited="processFavourited(item, $event)"
        v-on:reload="propagateReload"
        :mode="mode"
        v-on:CloseMenu="CloseMenu"
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
    events: ["pick", "favourited"]
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
    mode:{
      type:String,
      required: false,
      default:'edit'
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
    CloseMenu(ev) {
      this.openMenu = false;
      console.log("CLOSING MENUUU");
      console.log(ev);
      this.$emit('CloseMenu',ev);

    },
    processSelection(item, isSelected) {
      if (isSelected) this.selectedItems.push(item);
      else this.selectedItems = this.selectedItems.filter(i => i !== item);
    },
    processClick(item) {
      if (this.pick) this.$emit("pick", item);
      else console.log("Open its menu");
    },
    processFavourited(item, newValue) {
      this.$emit("favourited", item, newValue);
    }
  }
};
</script>

<style scoped></style>
