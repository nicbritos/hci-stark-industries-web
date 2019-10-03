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
      <SpeakerMenu name="La alarma de abajo"/>

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
import SpeakerMenu from "../components/Menus/SpeakerMenu";

export default {
  name: "Home",
  components: {DoorMenu, SpeakerMenu, RoutineContainer, DeviceContainer },
  data() {
    return {
      devices: this.$store.state.devices.favourites,
      routines: this.$store.state.routines.favourites
    };
  }
};
</script>

<style scoped></style>
