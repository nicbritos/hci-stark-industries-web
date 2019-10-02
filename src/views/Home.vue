<template>
  <v-container grid-list-md fluid>
    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Favourite Routines
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <RoutineContainer :items="routines"></RoutineContainer>

        <v-divider></v-divider>
      </v-col>
    </v-row>
      <DoorMenu name="hola"/>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Favourite Devices
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <DeviceContainer :room="true" :items="devices"></DeviceContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import RoutineContainer from "@/components/containers/RoutineContainer";
import DeviceContainer from "@/components/containers/DeviceContainer";
import DoorMenu from "../components/Menus/DoorMenu";

export default {
  name: "Home",
  components: { DoorMenu , RoutineContainer, DeviceContainer },
  data() {
    return {
      devices: this.$store.state.devices.favourites,
      routines: this.$store.state.routines.favourites
    };
  }
};
</script>

<style scoped></style>
