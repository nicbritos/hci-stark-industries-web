<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.devices.new" max-width="700px">
      <NewDevice
        region="ABC1"
        room="ABC2"
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
          :items="this.RoomModel.favoriteDevices"
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
          :items="this.RoomModel.devices"
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

export default {
  name: "Rooms",
  components: { NewDevice, DeviceContainer, Breadcrumbs },
  data() {
    return {
      breadcrumbsItems: [],

      dialogs: {
        devices: {
          new: false
        }
      },
      newDevice: {},

      on: false,

      RoomModel: {
        id: null,
        name: null,
        region: null,
        devices: [],
        favoriteDevices: []
      }
    };
  },
  computed: {
    defaultDevice() {
      return {
        name: null,
        region: null,
        room: null,
        device: null
      };
    }
  },
  methods: {
    reload() {
      console.log("'Bout to Update");
      this.LoadModel();
    },
    newDeviceOpen() {
      this.newDevice = Object.assign({}, this.defaultDevice);
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
    },
    async LoadModel() {
      console.log("LOADING");
      let id = this.$route.params.rid;

      let room = await apiWrapper.rooms.get(id);

      let devices = await apiWrapper.rooms.getDevices(id);
      console.log("DEVSSS");
      console.log(devices);

      let favDevs = devices.filter(el => {
        return el.meta.favourited;
      });
      console.log("FAV DEVS");
      console.log(favDevs);

      this.RoomModel = {
        id: id,
        name: room.name,
        region: room.meta.region,
        devices: devices,
        favoriteDevices: favDevs
      };

      console.log("AAAAAAAAAAAA");
      console.log(this.RoomModel);
    }
  },
  async mounted() {
    await this.LoadModel();

    this.breadcrumbsItems = [
      { to: "/Regions", text: this.RoomModel.region.name },
      { to: "/", text: this.RoomModel.name, disabled: true }
    ];
  }
};
</script>

<style scoped></style>
