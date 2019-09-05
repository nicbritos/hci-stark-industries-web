<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row>
        <v-col cols="6">
          <v-fade-transition leave-absolute>
            <h3 v-if="!open" key="0" class="text-no-bold">
              {{ region.name }}
            </h3>

            <h2 v-else key="1" class="text-no-bold">
              {{ region.name }}
            </h2>
          </v-fade-transition>
        </v-col>

        <v-col cols="auto" class="text--secondary">
          <v-fade-transition leave-absolute>
            <span v-if="!open">
              {{ roomQuantityString }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined text class="mb-2 mr-4" v-on="on" v-blur
        >EDIT</v-btn
        >
        <v-btn text outlined color="error" class="mb-2 mr-4" v-on="on" v-blur
        >DELETE</v-btn
        >
      </v-row>
      <v-divider></v-divider>

      <v-row>
        <v-toolbar flat color="transparent">
        <v-toolbar-title>
          <h4 class="text-no-bold">
            Rooms
          </h4>
        </v-toolbar-title>
      </v-toolbar>
        <v-spacer></v-spacer>
        <v-btn text color="primary" class="ma-2 mr-4" outlined v-on="on" v-blur
          >NEW ROOM</v-btn
        >
      </v-row>

      <RoomContainer :items="region.rooms"></RoomContainer>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import RoomContainer from "@/components/containers/RoomContainer";
export default {
  name: "Region",
  components: { RoomContainer },
  props: {
    region: {
      type: Object,
      required: true
    }
  },
  computed: {
    roomQuantityString() {
      return (
        (this.region.rooms.length === 0 ? "No" : this.region.rooms.length) +
        (this.region.rooms.length === 1 ? " room" : " rooms")
      );
    }
  }
};
</script>

<style scoped>
.text-no-bold {
  font-weight: normal;
}
</style>
