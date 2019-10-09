<template>
  <v-card hover style="cursor: default" width="350">
    <v-card-text v-ripple style="cursor: pointer" @click="goToRoom">
      <p class="display-1 text--primary">
        {{ room.name }}
      </p>
      <div class="text--secondary">{{ roomQuantityString }}<br /></div>
    </v-card-text>
  </v-card>
</template>

<script>
import apiWrapper from "../../data/apiWrapper";
export default {
  name: "Room",
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    devices: []
  }),
  computed: {
    roomQuantityString() {
      console.log("IN ROOM");
      console.log(this.devices);
      return (
        (this.devices.length === 0 ? "No" : this.devices.length) +
        (this.devices.length === 1 ? " device" : " devices")
      );
    }
  },
  methods: {
    goToRoom() {
      let path = this.$router.currentRoute.path;
      if (!this.$router.currentRoute.params.regionId) {
        path += "/" + this.room.parentRegion.id;
      }
      path += "/room/" + this.room.id;

      this.$router.push(path);
    },
    async refreshDevices() {
      console.log("Getting Devices for Room");
      this.devices = await apiWrapper.rooms.getDevices(this.room.id);
    }
  },
  async mounted() {
    await this.refreshDevices();
  }
};
</script>

<style scoped></style>
