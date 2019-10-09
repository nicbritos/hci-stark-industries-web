<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.devices.new" max-width="700px">
      <NewDevice
        :region="region"
        :room="room"
        :value="dialogs.devices.new"
        @closeClick="newDeviceClose"
      ></NewDevice>
    </v-dialog>
    <v-dialog v-model="dialogs.rooms.edit" max-width="700px">
      <EditRoom
        :show="dialogs.rooms.edit"
        :regions="regions"
        :room="room"
        @closeClick="onEditRoomClose"
      ></EditRoom>
    </v-dialog>
    <v-dialog v-model="dialogs.rooms.delete" max-width="700px">
      <DeleteDialog
        :show="dialogs.rooms.delete"
        :name="room ? room.name : ''"
        @closeClick="onDeleteRoomClose"
      ></DeleteDialog>
    </v-dialog>

    <v-toolbar class="ml-n6" flat color="transparent">
      <Breadcrumbs :items="breadcrumbsItems"></Breadcrumbs>
      <v-spacer></v-spacer>

      <v-btn
        class="mt-4 mr-4"
        text
        outlined
        color="primary"
        @click="onEditRoomOpen"
        v-blur
        >EDIT</v-btn
      >
      <v-btn
        class="mt-4 mr-n6"
        text
        outlined
        color="error"
        @click="onDeleteRoomOpen"
        v-blur
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

          <v-btn @click="newDeviceOpen" outlined text color="primary" v-blur
            >NEW DEVICE</v-btn
          >
        </v-toolbar>
        <DeviceContainer :items="devices"></DeviceContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import DeviceContainer from "@/components/containers/DeviceContainer";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewDevice from "@/components/action_menus/NewDevice";
import Room from "../data/schemas/Room";
import DeleteDialog from "../components/info_dialogs/DeleteDialog";
import EditRoom from "../components/action_menus/rooms/EditRoom";

export default {
  name: "Devices",
  components: {
    NewDevice,
    DeviceContainer,
    Breadcrumbs,
    DeleteDialog,
    EditRoom
  },
  data() {
    return {
      roomBreadcrumbItem: {},
      breadcrumbsItems: [],
      dialogs: {
        devices: {
          new: false,
          delete: false
        },
        rooms: {
          edit: false,
          delete: false
        }
      },
      regions: [],
      devices: [],
      favouriteDevices: [],
      newDevice: {},
      region: null,
      room: null
    };
  },
  methods: {
    newDeviceOpen() {
      this.openDialog(this.dialogs.devices, "new");
    },
    newDeviceClose(device) {
      this.dialogs.devices.new = false;
    },

    onEditRoomOpen() {
      this.dialogs.rooms.edit = true;
    },
    async onEditRoomClose(room) {
      if (room) {
        this.$store.state.loading = true;

        await this.room.changeName(room.name);
        this.roomBreadcrumbItem.text = this.room.name;

        this.$store.state.loading = false;
      }

      this.dialogs.rooms.edit = false;
    },

    onDeleteRoomOpen() {
      this.dialogs.rooms.delete = true;
    },
    async onDeleteRoomClose(value) {
      if (value) {
        this.$store.state.loading = true;

        if (await this.room.delete()) {
          this.$store.state.loading = false;
          this.dialogs.rooms.delete = false;
          this.$router.push("/regions/" + this.region.id);
        }
      } else {
        this.dialogs.rooms.delete = false;
      }
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
    this.roomBreadcrumbItem = this.breadcrumbsItems[this.breadcrumbsItems.length - 1];
  }
};
</script>

<style scoped></style>
