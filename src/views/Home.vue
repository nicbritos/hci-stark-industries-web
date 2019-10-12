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
            <Routine :routine="item" v-on:reload-site="reload"></Routine>
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

        <DeviceContainer
          :room="true"

          :items="devices"
          v-on:favourited="processFavourited"
        ></DeviceContainer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Routine from "@/components/individuals/Routine";
import DeviceContainer from "@/components/containers/DeviceContainer";
import CommonDeviceSchema from "../data/schemas/devices/CommonDeviceSchema";
import RoutineSchema from "../data/schemas/Routine";

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
     async reload(){
      console.log("LATEST EVENT SEND");

      console.log("'Bout to Update");
      await this.LoadModel();
      console.log("LATEST EVENT SEND");

      console.log("LATEST EVENT SEND");
    },

    processFavourited(item, value) {
      if (!value) {
        let index = this.devices.indexOf(item);
        if (index !== -1) this.devices.splice(index, 1);
      } else if (!this.devices.includes(item)) {
        this.devices.push(item);
      }
    },
    async LoadModel(){
        this.devices = (await CommonDeviceSchema.getAll()).filter(device => {
      return device.isFavourite();
    });
    console.log(this.devices);
    this.routines = (await RoutineSchema.getAll()).filter(routine => {
      return routine.isFavourite();
    });
    }
  },
  async mounted() {
    await this.LoadModel();
  }
};
</script>

<style scoped></style>
