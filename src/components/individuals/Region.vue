<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row>
        <v-col cols="6">
          <v-fade-transition leave-absolute>
            <h3 v-if="!open" class="text-no-bold">
              {{ region.name }}
            </h3>

            <h2 v-else class="text-no-bold">
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
        <v-btn
          @click="onButtonClick('edit')"
          color="primary"
          outlined
          text
          class="mb-2 mr-4"

          v-blur
          >EDIT</v-btn
        >
        <v-btn
          @click="onButtonClick('delete')"
          text
          outlined
          color="error"
          class="mb-2 mr-4"

          v-blur
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
        <v-btn
          @click="onButtonClick('newRoom')"
          text
          color="primary"
          class="ma-2 mr-4"
          outlined

          v-blur
          >NEW ROOM</v-btn
        >
      </v-row>

      <BoxContainer :items="region.rooms">
        <template v-slot:item="{ item }">
          <Room :roomid="item.id" :name="item.name" :count="item.getCount()" :parent="region"></Room>
        </template>
      </BoxContainer>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Room from "@/components/individuals/Room";
import Region from "../../data/schemas/Region";

export default {
  name: "Region",
  components: { BoxContainer, Room },
  model: {
    events: ["delete", "edit", "newRoom"]
  },
  data: () => ({
    on: false
  }),
  props: {
    region: {
      type: Region,
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
  },
  methods: {
    onButtonClick(name) {
      this.$emit(name);
    }
  }
};
</script>

<style scoped>
.text-no-bold {
  font-weight: normal;
}
</style>
