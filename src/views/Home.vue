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
            <Routine :routine="item" v-on:reload-site="reload" ></Routine>
          </template>
        </BoxContainer>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Favourite Devices
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <DeviceContainer :room="true" :items="devices" v-on:reload="reload"></DeviceContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Routine from "@/components/individuals/Routine";
import DeviceContainer from "@/components/containers/DeviceContainer";
import apiWrapper from "../data/apiWrapper";
import Routines from "./Routines";
import Devices from "../data/schemas/Devices";

export default {
  name: "Home",
  components: {
    Routine,
    BoxContainer,
    DeviceContainer
  },
  data() {
    return {
      devices: [],
      routines: []
    };
  },
  methods:{
    reload(){
      console.log("'Bout to Update");
      this.LoadModel();

    },
    async LoadModel(){
      this.devices = await Devices.getFavourtites();
      let routs = await apiWrapper.routines.getAll();
      this.routines = routs.filter(el=>{return el.meta.favourited});
    },
  },
  async mounted() {
    this.LoadModel();
  }
};
</script>

<style scoped></style>
