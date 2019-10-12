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
      <v-btn icon absolute right @click="openDeleteDialog()" v-if="mode === 'edit'">
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
              :disabled="!isOn" 
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
            hide-inputs
            :disabled="!isOn" 
          ></v-color-picker>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-blur color="red" @click="Exit(false)">Cancel</v-btn>
      <v-btn v-blur color="blue" :disabled="mode === 'edit' &&!modified" @click="SaveAndExit()">SAVE</v-btn>
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
    mode: {
      type: String,
      required: false,
      default: 'edit'
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    color: "",
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
              this.device.color !== this.color.substring(1,7)
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
      console.log(this.color);
      console.log(this.device.color);
      var hash = "#";
      var trasparency = "FF";
      if (this.device != null) {
        await this.device.refreshState();
        this.color = hash.concat(this.device.color).concat(trasparency);
        this.isOn = this.device.isOn;
        this.brightness = this.device.brightness;
      }
    },
    async SaveAndExit() {
      this.$store.state.loading = true;

      if(this.mode === 'edit') {
        if (this.isOn !== this.device.isOn) {
          this.isOn ? await this.device.turnOn() : await this.device.turnOff();
        }
        if (this.isOn) {
          await this.device.setColor(this.color.substring(1,7));
          await this.device.setBrightness(this.brightness);
        }
      }
      this.$store.state.loading = false;

      this.Exit(true);
    },
    Exit(confirm) {
      console.log("Sending Close Event from Lamp");

      this.$emit("CloseMenu", {
        confirmed: confirm,
        name: this.device.name,
        deviceId: this.device.deviceId,
        id: this.device.id,
        customState: {
          color: this.color.substring(1,7),
          isOn: this.isOn,
          brightness: this.brightness
        }
      });
    },
    onDelete() {
      this.$emit("delete");
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
