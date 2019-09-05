<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row no-gutters>
        <v-col cols="4">
          <v-fade-transition leave-absolute>
            <h3 v-if="!open" key="0" class="text-no-bold">
              {{ region.name }}
            </h3>

            <h2 v-else key="1" class="text-no-bold">
              {{ region.name }}
            </h2>
          </v-fade-transition>
        </v-col>

        <v-col cols="8" class="text--secondary">
          <v-fade-transition leave-absolute>
            <span v-if="!open">
              {{ roomQuantityString }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
        <v-divider></v-divider>
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
