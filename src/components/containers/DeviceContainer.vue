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
        v-on:reloadall="propagateReloadAll"
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


      this.$emit('CloseMenu',ev);

    },
    propagateReload(ev){

      this.$emit('reload',ev);
    },
    propagateReloadAll(ev){

      this.$emit('reloadall',ev);
    },
    processSelection(item, isSelected) {
      if (isSelected) this.selectedItems.push(item);
      else this.selectedItems = this.selectedItems.filter(i => i !== item);
    },
    processClick(item) {
      if (this.pick) this.$emit("pick", item);

    },
    processFavourited(item, newValue) {
      this.$emit("favourited", item, newValue);
    }
  }
};
</script>

<style scoped></style>
