<template>
  <v-container>
    <FridgeMenu
      v-if="device.type.id === 'rnizejqr2di0okho'"
      :device="device"
	  :show="show"
      @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <SpeakerMenu
      v-else-if="device.type.id === 'c89b94e8581855bc'"
      :device="device"
	  :show="show"
	  @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <CurtainsMenu
      v-else-if="device.type.id === 'eu0v2xgprrhhg41g'"
      :device="device"
	  :show="show"
	  mode="edit"
      @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <LampMenu
      v-else-if="device.type.id === 'go46xmbqeomjrsjr'"
      :device="device"
	  :show="show"
	  @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <OvenMenu
      v-else-if="device.type.id === 'im77xxyulpegfmv8'"
      :device="device"
	  :show="show"
	  @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <ACMenu
      v-else-if="device.type.id === 'li6cbv5sdlatti0j'"
      :device="device"
	  :show="show"
	  @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />

    <DoorMenu
      v-else-if="device.type.id === 'lsf78ly0eqrjbz91'"
      :device="device"
	  :show="show"
	  @delete="ResendEvent('delete', $event)"
      @CloseMenu="ResendEvent('close', $event)"
    />
  </v-container>
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
    }
  },
  methods: {
    ResendEvent(name, event) {
      this.$emit(name, event);
    }
  }
};
</script>

<style scoped></style>
