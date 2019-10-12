<template>
  <FridgeMenu
    v-if="device.deviceId === 'rnizejqr2di0okho'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <SpeakerMenu
    v-else-if="device.deviceId === 'c89b94e8581855bc'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <CurtainsMenu
    v-else-if="device.deviceId === 'eu0v2xgprrhhg41g'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <LampMenu
    v-else-if="device.deviceId === 'go46xmbqeomjrsjr'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <OvenMenu
    v-else-if="device.deviceId === 'im77xxyulpegfmv8'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <ACMenu
    v-else-if="device.deviceId === 'li6cbv5sdlatti0j'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />

  <DoorMenu
    v-else-if="device.deviceId === 'lsf78ly0eqrjbz91'"
    :mode="mode"
    :device="device"
    :show="show"
    @delete="ResendEvent('delete', $event)"
    @CloseMenu="ResendEvent('close', $event)"
  />
</template>

<script>
import FridgeMenu from "../Menus/FridgeMenu";
import DoorMenu from "../Menus/DoorMenu";
import CurtainsMenu from "../Menus/CurtainsMenu";
import SpeakerMenu from "../Menus/SpeakerMenu";
import ACMenu from "../Menus/ACMenu";
import LampMenu from "../Menus/LampMenu";
import OvenMenu from "../Menus/OvenMenu";
import CommonDeviceSchema from "../../data/schemas/devices/CommonDeviceSchema";

export default {
  name: "DeviceSelector",
  components: {
    OvenMenu,
    ACMenu,
    LampMenu,
    DoorMenu,
    SpeakerMenu,
    CurtainsMenu,
    FridgeMenu
  },
  props: {
    device: {
      type: CommonDeviceSchema,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: "edit"
    }
  },
		watch: {
          openMenu: function (val) {
            console.log("opening Device Selector");
            this.superOpen = val;
            console.log("Selected device: " + this.device.name);
            console.log(this.device);
            console.log("STate: " + val);
          }
        },
  methods: {
    ResendEvent(name, event) {
      this.$emit(name, event);
    }
  },
  mounted() {
    console.log(this.device);
  }
};
</script>

<style scoped></style>
