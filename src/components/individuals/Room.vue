<template>
  <v-card hover style="cursor: default" width="350">
    <v-card-text v-ripple style="cursor: pointer" @click="goToRoom">
      <p class="display-1 text--primary">
        {{ name }}
      </p>
      <div class="text--secondary">{{ roomQuantityString }}<br /></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Room",
  props: {
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    roomQuantityString() {
      return (
        (this.count === 0 ? "No" : this.count) +
        (this.count === 1 ? " device" : " devices")
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
    }
  }
};
</script>

<style scoped></style>
