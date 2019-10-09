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
          {{
            device.name +
              (room && device.room ? " from " + device.room.name : "")
          }}
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
        <v-spacer></v-spacer>
        <v-btn
          v-if="editable"
          large
          icon
          v-blur
          text
          color="primary"
          :loading="loadingFav"
          @click="applyFavouriteSelection"
        >
          <v-icon large v-if="this.device.isFavourite()">favorite</v-icon>
          <v-icon large v-else>favorite_outline</v-icon>
        </v-btn>
        <v-switch
          v-if="editable && hasAction"
          class="ml-4 mb-n6 pb-0 pa-0 mt-0"
          v-model="isOn"
          v-blur
          :loading="loadingToggle"
          @change="onSwitchUpdate()"
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
import apiWrapper from "../../data/apiWrapper";
import QuickActionHelper from "../../data/QuickActionHelper";
import CommonDeviceSchema from "../../data/schemas/devices/CommonDeviceSchema";
import Room from "../../data/schemas/Room";

export default {
  name: "Device",
  components: { DeviceSelector },
  model: {
    events: ["update", "click", "favourited"]
  },
  props: {
    device: {
      type: CommonDeviceSchema,
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
    image: "",
    fav: false,
    isOn: false,
    hasAction: true,
    loadingFav: false,
    loadingToggle: false,
    quickAction: null
  }),
  methods: {
    async onSwitchUpdate() {
      console.log(`About to do quick action. Curr state: ${this.isOn}`);
      await this.quickAction.action(this.device.id, this.isOn);
      this.isOn = !this.isOn;
    },
    async applyFavouriteSelection() {
      this.loadingFav = true;
      try {
        await this.device.room.setFavourite(this.device, !this.device.isFavourite());
      } catch (e) {
        await this.device.setFavourite(!this.device.isFavourite());
      }
      this.loadingFav = false;
      this.$emit("favourited", this.device.isFavourite());
    },
    onSelectUpdate(value) {
      this.$emit("selectUpdate", value);
    },
    onClick() {
      this.$emit("click");
    },
    CloseMenu() {
      this.openMenu = false;
    },
    OpenMenu() {
      this.openMenu = true;
    },
    getImage() {


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
  async mounted() {
    this.image = this.GetImage();
    // this.fav = this.GetFavourite();
    //
    // console.log("AFTER APPLYING");
    // console.log(
    //   `device: ${this.device.name} is fav: ${this.fav} and in DB is: ${
    //     this.device.meta.favourited
    //   }`
    // );
    // this.hasAction = await QuickActionHelper.hasQuickAction(
    //   this.device.type.id
    // );
    //
    // if (this.hasAction) {
    //   this.quickAction = await QuickActionHelper.getQuickAction(
    //     this.device.type.id
    //   );
    //   this.isOn = this.quickAction.checkState(this.device);
    // }
  }
};
</script>

<style scoped></style>
