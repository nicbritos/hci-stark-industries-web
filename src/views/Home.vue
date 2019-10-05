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

        <BoxContainer :items="routines">
          <template v-slot:item="{ item }">
            <Routine :routine="item"></Routine>
          </template>
        </BoxContainer>

        <v-divider></v-divider>
      </v-col>
    </v-row>
      <DoorMenu  device-id="869735bb70eb32bd" name="hola"/>
<!--      <SpeakerMenu name="La alarma de abajo"/>-->
    <AlarmMenu name="La alarma de abajo" menu-mode="create" />
    <CurtainsMenu device-id="614e3702c691b381" name="pedazo de mierda" mode="edit"/>
    <FridgeMenu device-id="f78085122d61521d" name="Heladerita"/>

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
import BoxContainer from "@/components/containers/BoxContainer";
import Routine from "@/components/individuals/Routine";
import DeviceContainer from "@/components/containers/DeviceContainer";
import SpeakerMenu from "../components/Menus/SpeakerMenu";
import DoorMenu from "../components/Menus/DoorMenu";
import AlarmMenu from "../components/Menus/AlarmMenu";
import CurtainsMenu from "../components/Menus/CurtainsMenu";
import FridgeMenu from "../components/Menus/FridgeMenu";

export default {
  name: "Home",
  components: {
  DoorMenu,
    AlarmMenu,
    CurtainsMenu,
    Routine,
    SpeakerMenu,
    FridgeMenu,
    BoxContainer,
    DeviceContainer
  },
  data() {
    return {
      devices: this.$store.state.devices.favourites,
      routines: this.$store.state.routines.favourites
    };
  }
};
</script>

<style scoped></style>
