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
      <span class="headline">{{ device ? device.name : "" }}</span>
      <v-btn icon absolute right @click="openDeleteDialog">
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
        <span>Temperature</span>
        <v-row justify="space-around" class="text-center">
          <v-btn
            icon
            class="justify-center col-md-1"
            :disabled="temperature <= minTemperature || !isOn"
            @click="temperature = temperature - 1"
          >
            <v-avatar color="blue">
              <v-icon>remove</v-icon>
            </v-avatar>
          </v-btn>

          <v-avatar color="blue" size="80">
            <span class="white--text headline">{{ temperature }}</span>
          </v-avatar>

          <v-btn
            icon
            class="justify-center col-md-1"
            :disabled="temperature >= maxTemperature || !isOn"
            @click="temperature = 1 + temperature"
          >
            <v-avatar color="blue">
              <v-icon>add</v-icon>
            </v-avatar>
          </v-btn>
        </v-row>
        <span>Mode</span>
        <v-row justify="space-around" align="center">
          <v-radio-group :disabled="!isOn" v-model="mode" row>
            <v-radio label="Cool" value="cool"></v-radio>
            <v-radio label="Fan" value="fan"></v-radio>
            <v-radio label="Heat" value="heat"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Vertical Blades</span>
        <v-row justify="space-around" align="center">
          <v-radio-group :disabled="!isOn"  v-model="vertical_blades" row>
            <v-radio label="Auto" value="auto"></v-radio>
            <v-radio label="22°" value="22"></v-radio>
            <v-radio label="45°" value="45"></v-radio>
            <v-radio label="67°" value="67"></v-radio>
            <v-radio label="90°" value="90"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Horizontal Blades</span>
        <v-row justify="space-around" align="center">
          <v-radio-group  :disabled="!isOn" v-model="horizontal_blades" row>
            <v-radio label="Auto" value="auto"></v-radio>
            <v-radio label="-90°" value="-90"></v-radio>
            <v-radio label="-45°" value="-45"></v-radio>
            <v-radio label="0°" value="0"></v-radio>
            <v-radio label="45°" value="45"></v-radio>
            <v-radio label="90°" value="90"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Speed</span>
        <v-row justify="space-around" align="center">
          <v-radio-group :disabled="!isOn" v-model="speed" row>
            <v-radio label="Auto" value="auto"></v-radio>
            <v-radio label="25%" value="25"></v-radio>
            <v-radio label="50%" value="50"></v-radio>
            <v-radio label="75%" value="75"></v-radio>
            <v-radio label="100%" value="100"></v-radio>
          </v-radio-group>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-blur color="red" @click="Exit()">Cancel</v-btn>
      <v-btn v-blur color="blue" :disabled="modified" @click="SaveAndExit()">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AC from "../../data/schemas/devices/AC";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "ACMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: AC,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isOn: false,
    temperature: 18,
    mode: "cool",
    vertical_blades: "auto",
    horizontal_blades: "auto",
    deleteDialog: false,
    speed: "auto"
  }),
  computed: {
    modified() {
      if (this.device == null) return false;
      return (
        this.device.isOn !== this.isOn ||
        this.device.mode !== this.mode ||
        this.device.swing.vertical !== this.vertical_blades ||
        this.device.swing.horizontal !== this.horizontal_blades ||
        this.device.speed !== this.speed
      );
    },

    minTemperature() {
      return AC.minTemperature();
    },
    maxTemperature() {
      return AC.maxTemperature();
    }
  },
  methods: {
    async resetData() {
      if (this.device != null) {
        await this.device.refreshState();
        this.temperature = this.device.temperature;
        this.mode = this.device.mode;
        this.vertical_blades = this.device.swing.vertical;
        this.horizontal_blades = this.device.swing.horizontal;
        this.speed = this.device.fanSpeed;
      }
    },

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
    async SaveAndExit() {
      this.$store.state.loading = true;
      if (this.isOn) {
        await this.device.turnOn();
        await this.device.setMode(this.mode);
        await this.device.setFanSpeed(this.speed);
        await this.device.setTemperature(this.temperature);
        await this.device.setVerticalSwing(this.vertical_blades);
        await this.device.setHorizontalSwing(this.horizontal_blades);
      } else await this.device.turnOff();
      this.$store.state.loading = false;

      this.Exit();
    },
    Exit() {
      console.log("Sending Close Event from AC");
      this.$emit("CloseMenu");
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
