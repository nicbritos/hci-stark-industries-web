<template>
  <v-card hover style="cursor: default" width="200">
    <v-card-text v-ripple style="cursor: pointer">
      <div class="text--secondary">
        {{ device.name + (room ? " from " + device.room.name : "") }}
      </div>
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-img
            max-height="100"
            max-width="100"
            :src="device.type.image"
          ></v-img>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-checkbox
        v-if="selectable"
        color="primary"
        v-blur
        @change="onSelectUpdate($event)"
        :input-value="selected"
        hide-details
        dense
        class="ml-2 mt-n1"
      >
      </v-checkbox>
      <v-btn v-if="editable" icon v-blur text>
        <v-icon>
          more_horiz
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="editable" large icon v-blur text color="primary">
        <v-icon large v-if="device.favourited" key="0">favorite</v-icon>
        <v-icon large v-else key="1">favorite_outline</v-icon>
      </v-btn>
      <v-switch
        v-if="editable"
        class="ml-4 mb-n6 pb-0 pa-0 mt-0"
        v-model="device.on"
        v-blur
        color="primary"
      >
      </v-switch>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Routine",
  model: {
    events: ["selectUpdate"]
  },
  props: {
    device: {
      type: Object,
      required: true
    },
    room: {
      type: Boolean,
      required: false,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onSelectUpdate(value) {
      this.$emit("selectUpdate", value);
    }
  }
};
</script>

<style scoped></style>
