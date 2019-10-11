<template>
  <v-card dark raised>
    <v-dialog v-model="deleteDialog" max-width="700">
      <DeleteDialog
        :name="device.name"
        :show="deleteDialog"
        @closeClick="Delete"
      ></DeleteDialog>
    </v-dialog>
    <v-card-title>
      <span class="headline">{{ device.name }}</span>
      <v-btn icon absolute right @click="openDeleteDialog()">
        <v-avatar color="red">
          <v-icon>delete</v-icon>
        </v-avatar>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-switch v-model="isOn"></v-switch>
        </v-row>
        <v-row left>
          <span>Intensity</span>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
            <v-slider
              v-model="brightness"
              prepend-icon="lightbulb"
              append-icon="lightbulb"
            ></v-slider>
          </v-col>
        </v-row>
        <hr />
        <br />
        <v-row left>
          <span>Color</span>
        </v-row>
        <v-row class="justify-center">
          <v-color-picker
            light
            v-model="color"
            mode="hex"
            hide-inputs
          ></v-color-picker>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-blur color="red" @click="Exit()">Cancel</v-btn>
      <v-btn v-blur color="blue" :disabled="!modified" @click="SaveAndExit()">SAVE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Lamp from "../../data/schemas/devices/Lamp";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "LampMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Lamp,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    color: {
      r: 255,
      g: 255,
      b: 255
    },
    deleteDialog: false,
    isOn: false,
    brightness: 0
  }),
  computed: {
    modified() {
      if (this.device == null) return false;
      return (
              this.device.isOn !== this.isOn ||
              this.device.brightness !== this.brightness ||
              this.device.colors.red !== this.color.r ||
              this.device.colors.green !== this.color.g ||
              this.device.colors.blue !== this.color.b
      );
    }
  },
  methods: {
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    async Delete(value) {
      if (value) {
        try {
          await this.device.room.deleteDevice(this.device);
        } catch (e) {
          await this.device.delete();
        }
        this.deleteDialog = false;
        this.onDelete();
      } else {
        this.deleteDialog = false;
      }
    },
    async resetData() {
      if (this.device != null) {
        await this.device.refreshState();
        this.color.r = this.device.colors.red;
        this.color.g = this.device.colors.green;
        this.color.b = this.device.colors.blue;
        this.isOn = this.device.isOn;
        this.brightness = this.device.brightness;
      }
    },
    async SaveAndExit() {
      this.$store.state.loading = true;
      if (this.isOn !== this.device.isOn) {
        this.isOn ? await this.device.turnOn() : await this.device.turnOff();
      }
      if (this.isOn) {
        await this.device.setColor(this.color.r, this.color.g, this.color.b);
        await this.device.setBrightness(this.brightness);
      }
      this.$store.state.loading = false;

      this.Exit();
    },
    Exit() {
      console.log("Sending Close Event from Lamp");
      this.$emit("CloseMenu");
    }
  },
  watch: {
    show: function(val) {
      if (val) {
        this.resetData();
      }
    }
  },
  mounted() {
    this.resetData();
  }
};
</script>

<style scoped></style>
