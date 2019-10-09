<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.devices.new" max-width="700px">
      <NewDevice
        :region="region"
        :room="room"
        :value="dialogs.devices.new"
        @cancel="newDeviceClose"
      ></NewDevice>
    </v-dialog>
    <v-toolbar class="ml-n6" flat color="transparent">
      <Breadcrumbs :items="breadcrumbsItems"></Breadcrumbs>
      <v-spacer></v-spacer>

      <v-btn class="mt-4 mr-4" text outlined color="primary" v-on="on" v-blur
        >EDIT</v-btn
      >
      <v-btn class="mt-4 mr-n6" text outlined color="error" v-on="on" v-blur
        >DELETE</v-btn
      >
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
        <DeviceContainer
          :items="favouriteDevices"
          v-on:reload="reload"
        ></DeviceContainer>
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

          <v-btn
            @click="newDeviceOpen"
            outlined
            text
            color="primary"
            v-on="on"
            v-blur
            >NEW DEVICE</v-btn
          >
        </v-toolbar>
        <DeviceContainer
          :items="devices"
          v-on:reload="reload"
        ></DeviceContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import apiWrapper from "../data/apiWrapper";
import DeviceContainer from "@/components/containers/DeviceContainer";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewDevice from "@/components/action_menus/NewDevice";
import Region from "../data/schemas/Region";
import Room from "../data/schemas/Room";

export default {
  name: "Devices",
  components: { NewDevice, DeviceContainer, Breadcrumbs },
  data() {
    return {
      breadcrumbsItems: [],
      dialogs: {
        devices: {
          new: false,
          delete: false
        },
        room: {
          edit: false,
          delete: false
        }
      },
      devices: [],
      favouriteDevices: [],
      newDevice: {},
      on: false,
      region: null,
      room: null
    };
  },
  methods: {
    reload() {
      console.log("'Bout to Update");
    },
    newDeviceOpen() {
      this.openDialog(this.dialogs.devices, "new");
    },
    newDeviceClose() {
      // Save to DB
      this.closeDialog(this.dialogs.devices, "new");
    },

    openDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (!item[type]) item[type] = true;
    },
    closeDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (item[type]) item[type] = false;
    }
  },
  async mounted() {
    let roomId = this.$route.params.rid;

    this.room = await Room.get(roomId);
    this.region = this.room.parentRegion;
    this.devices = this.room.devices;
    this.favouriteDevices = this.room.favouriteDevices;

    this.breadcrumbsItems = [
      { to: "/regions", text: "Regions" },
      { to: "/regions/" + this.region.id, text: this.region.name },
      {
        to: this.$router.currentRoute.path,
        text: this.room.name,
        disabled: true
      }
    ];
  }
};
</script>

<style scoped></style>
