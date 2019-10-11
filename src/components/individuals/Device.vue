<template>
  <v-container>
    <v-dialog v-model="menu" max-width="600px">
      <DeviceSelector
        :device="device"
        :show="menu"
        v-on:CloseMenu="closeMenu()"
      ></DeviceSelector>
    </v-dialog>

    <v-card dark hover style="cursor: default" width="200">
      <v-card-text @click="onClick" v-ripple style="cursor: pointer">
        <div class="white--text">
          {{
            device.name
          }}
        </div>
        <v-container fluid>
          <v-row align="start" justify="center">
            <v-img max-height="100" max-width="100" :src="image"></v-img>
          </v-row>
        </v-container>
        <div class="white--text">
          {{(room && device.room ? device.room.name : "")
          }}
        </div>
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
    menu: false,
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
        await this.device.room.setFavourite(
          this.device,
          !this.device.isFavourite()
        );
      } catch (e) {
        await this.device.setFavourite(!this.device.isFavourite());
      }
      this.loadingFav = false;
      this.$emit("favourited", this.device.isFavourite());
    },
    onSelectUpdate(value) {
      this.$emit("selectUpdate", value);
    },
    openMenu() {
      this.menu = true;
    },
    onClick() {
      if (this.editable) this.openMenu();
      else this.$emit("click");
    },
    closeMenu() {
      this.menu = false;
    }
  },
  async mounted() {
    this.image = ImageRetriever.getImage(this.device);

    // this.hasAction = await QuickActionHelper.hasQuickAction(
    //   this.device.deviceId
    // );
    //
    // if (this.hasAction) {
    //   this.quickAction = await QuickActionHelper.getQuickAction(
    //     this.device.deviceId
    //   );
    //   this.isOn = this.quickAction.checkState(this.device);
    // }
  }
};
</script>

<style scoped></style>
