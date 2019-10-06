<template>
  <v-card hover style="cursor: default" width="350">
    <v-card-text v-ripple style="cursor: pointer" @click="goToRoom">
      <p class="display-1 text--primary">
        {{ room.name }}PUTAAAA
      </p>
      <div class="text--secondary">{{ roomQuantityString }}<br /></div>
    </v-card-text>
    <!--    <v-card-actions>-->
    <!--      <v-spacer></v-spacer>-->
    <!--      <v-btn text v-blur color="primary">-->
    <!--        EDIT-->
    <!--      </v-btn>-->
    <!--      <v-btn text v-blur color="error">-->
    <!--        REMOVE-->
    <!--      </v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  name: "Room",
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  computed: {
    roomQuantityString() {
      return (
        (this.room.devices.length === 0 ? "No" : this.room.devices.length) +
        (this.room.devices.length === 1 ? " device" : " devices")
      );
    }
  },
  methods: {
    goToRoom() {
      this.$router.push(this.$router.currentRoute.path + "/" + this.room.id);
    }
  }
};
</script>

<style scoped></style>
