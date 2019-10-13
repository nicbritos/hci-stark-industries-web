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
        <v-btn icon absolute right @click="openDeleteDialog"  v-if="mode === 'edit'">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-switch v-model="isOn"></v-switch>
        </v-row>
        <span>Temperature</span>
        <v-row justify="space-around" align="center" class="text-center">
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
        <span>Heat Source</span>
        <v-row justify="space-around" align="center">
          <v-radio-group v-model="heat_source" row>
            <v-radio label="default" value="conventional"></v-radio>
            <v-radio label="low" value="bottom"></v-radio>
            <v-radio label="high" value="top"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Grill Mode</span>
        <v-row justify="space-around" align="center">
          <v-slider
            v-model="grill"
            :tick-labels="labelsGrill"
            :max="2"
            step="1"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </v-row>
        <span>Convection Mode</span>
        <v-row justify="space-around" align="center">
          <v-slider
            v-model="convection"
            :tick-labels="labelsConvection"
            :max="2"
            step="1"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="Exit(false)">Cancel</v-btn>
          <v-btn color="blue" :disabled="mode === 'edit' &&!modified" @click="SaveAndExit()">SAVE</v-btn>
        </div>
      </v-card-actions>
    </v-card>
</template>

<script>
import Oven from "../../data/schemas/devices/Oven";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "OvenMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Oven,
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
    isOn: false,
    temperature: 100,
    heat_source: "conventional",
    grill: 0,
    convection: 0,
    labelsConvection: ["normal", "eco", "off"],
    labelsGrill: ["large", "eco", "off"],
    deleteDialog: false
  }),
  computed: {
    modified() {
      if (this.device == null) return false;
      return (
              this.device.temperature !== this.temperature ||
              this.device.isOn !== this.isOn ||
              this.device.heatMode !== this.heat_source ||
              this.device.convectionMode !== this.labelsConvection.indexOf(this.convection) ||
              this.device.grillMode !== this.labelsGrill.indexOf(this.grill)
      );
    },
    minTemperature() {
      return Oven.minTemperature();
    },
    maxTemperature() {
      return Oven.maxTemperature();
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
        this.isOn = this.device.isOn;
        this.temperature = this.device.temperature;
        this.heat_source = this.device.heatMode;
        this.grill = this.labelsGrill.indexOf(this.device.grillMode);
        this.convection = this.labelsConvection.indexOf(this.device.convectionMode);
      }
    },
    async SaveAndExit() {
      this.$store.state.loading = true;

      if(this.mode === 'edit') {
        if (this.isOn) {

          await this.device.turnOn();
          await this.device.setTemperature(this.temperature);
          await this.device.setConvection(this.labelsConvection[this.convection]);
          await this.device.setGrill(this.labelsGrill[this.grill]);
          await this.device.setHeat(this.heat_source);
        } else await this.device.turnOff();
      }
      this.$store.state.loading = false;

      this.Exit(true);
    },
    Exit(confirm){

      this.$emit('CloseMenu', {
        confirmed: confirm,
        name: this.device.name,
        deviceId: this.device.deviceId,
        id: this.device.id,
        customState: {
          isOn: this.isOn,
          temperature: this.temperature,
          heat_source: this.heat_source,
          grill: this.grill,
          convection: this.convection,
        }
      })
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
    this.resetData()
  }
};
</script>

<style scoped></style>
