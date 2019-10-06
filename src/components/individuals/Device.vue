<template>
  <v-container>
    <DeviceSelector
      :device="device"
      :openMenu="openMenu"
      v-on:CloseMenu="CloseMenu()"
    ></DeviceSelector>
    <v-card hover style="cursor: default" width="200">
      <v-card-text @click="OpenMenu()" v-ripple style="cursor: pointer">
        <div class="text--secondary">
          {{ device.name + (room ? " from " + device.room.name : "") }}
        </div>
        <v-container fluid>
          <v-row align="start" justify="center">
            <v-img max-height="100" max-width="100" :src="image"></v-img>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions v-if="selectable || editable">
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
        <v-btn v-if="editable" icon v-blur text @click="OpenMenu()">
          <v-icon>
            more_horiz
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="editable" large icon v-blur text color="primary">
          <v-icon large v-if="GetFavourite()" key="0">favorite</v-icon>
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
  </v-container>
</template>

<script>
import ImageRetriever from "../../data/ImageRetriever";
import DeviceSelector from "../containers/DeviceSelector";
export default {
  name: "Routine",
  components: { DeviceSelector },
  model: {
    events: ["selectUpdate", "click"]
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
  data: () => ({
    openMenu: false,
      image:"",
  }),
  methods: {
    onSelectUpdate(value) {
      this.$emit("selectUpdate", value);
    },
    onClick() {
      this.$emit("click");
    },
    CloseMenu() {
      console.log("Closing shit");
      console.log("openMenu: " + this.openMenu);
      this.openMenu = false;
      console.log("openMenu: " + this.openMenu);
    },
    OpenMenu() {
      this.openMenu = true;
      console.log("Opening menu: " + this.device.name);
    },
      GetFavourite(){
          console.log("CHECK FAVORUTITE");
          console.log(this.device);
        return this.device.meta.favourited;
      },
      GetImage() {
          console.log(this.device);
        console.log("Getting Image");
          console.log(`sending ID: ${this.device.type.id}`)
      switch (this.device.type.id) {
        case "rnizejqr2di0okho": // FRIDGE
          return ImageRetriever.GetImages(
            this.device.type.id,
            ImageRetriever.ACTIONS.INVARIANT
          );
        case "c89b94e8581855bc": // SPEAKER
          if (this.device.state.status === "playing")
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.ON
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.OFF
            );
        case "eu0v2xgprrhhg41g": // CURTAINS
          if (
            this.device.state.status === "opened" ||
            this.device.state.status === "opening"
          )
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.OPEN
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.CLOSE
            );
        case "go46xmbqeomjrsjr": // LAMP
          if (this.device.state.status === "off")
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.OFF
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.ON
            );
        case "im77xxyulpegfmv8": //Oven
          if (this.device.state.status === "off")
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.OFF
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.ON
            );
        case "li6cbv5sdlatti0j": //AC
          if (this.device.state.status === "off")
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.OFF
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.ON
            );
        case "lsf78ly0eqrjbz91": // DOOR
          if (this.device.state.lock === "locked")
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.LOCK
            );
          else
            return ImageRetriever.GetImages(
              this.device.type.id,
              ImageRetriever.ACTIONS.UNLOCK
            );
      }
    }
  },
  mounted() {
      this.image = this.GetImage();
  }
};
</script>

<style scoped></style>
