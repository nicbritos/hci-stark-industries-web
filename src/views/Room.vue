<template>
  <v-container grid-list-md fluid>
    <v-toolbar class="ml-n6" flat color="transparent">
      <Breadcrumbs
        :items="[
          { to: '/', text: 'First Floor' },
          { to: '/', text: 'Comedor', disabled: true }
        ]"
      ></Breadcrumbs>
      <v-spacer></v-spacer>

      <v-btn class="mt-4 mr-4" text outlined color="primary" v-on="on" v-blur>EDIT</v-btn>
      <v-btn class="mt-4 mr-n6" text outlined color="error" v-on="on" v-blur>DELETE</v-btn>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Favourite Devices
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <DeviceContainer :items="favouriteDevices"></DeviceContainer>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              All Devices
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn outlined text color="primary" v-on="on" v-blur>NEW DEVICE</v-btn>
        </v-toolbar>
        <DeviceContainer :items="devices"></DeviceContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import DeviceContainer from "@/components/containers/DeviceContainer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "Rooms",
  components: { DeviceContainer, Breadcrumbs },
  data() {
    return {
      favouriteDevices: this.$store.state.devices.favourites,
      devices: this.$store.state.devices.items
    };
  }
};
</script>

<style scoped></style>
