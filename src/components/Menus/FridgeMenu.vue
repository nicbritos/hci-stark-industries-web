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

      <v-btn icon absolute right @click="openDeleteDialog">
        <v-avatar color="red">
          <v-icon>delete</v-icon>
        </v-avatar>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <span>Freezer Temperature</span>
        <v-row>
          <div class="buttonsContainer">
            <v-btn
              icon
              height="50"
              width="50"
              class="buttonLeft"
              :disabled="freezerTemperature <= minFreezerTemperature"
              @click="freezerTemperature--"
            >
              <v-avatar color="blue">
                <v-icon>remove</v-icon>
              </v-avatar>
            </v-btn>

            <v-avatar color="blue" size="80">
              <span class="white--text headline">{{ freezerTemperature }}</span>
            </v-avatar>

            <v-btn
              icon
              height="50"
              width="50"
              class="buttonRight"
              :disabled="freezerTemperature >= maxFreezerTemperature"
              @click="freezerTemperature++"
            >
              <v-avatar color="blue">
                <v-icon>add</v-icon>
              </v-avatar>
            </v-btn>
          </div>
        </v-row>

        <span> Fridge Temperature</span>
        <v-row>
          <div class="buttonsContainer">
            <v-btn
              icon
              height="50"
              width="50"
              class="buttonLeft"
              @click="temperature--"
              :disabled="temperature <= minFridgeTemperature"
            >
              <v-avatar color="blue">
                <v-icon>remove</v-icon>
              </v-avatar>
            </v-btn>

            <v-avatar color="blue" size="80">
              <span class="white--text headline">{{ temperature }}</span>
            </v-avatar>

            <v-btn
              height="50"
              width="50"
              icon
              class="buttonRight"
              @click="temperature++"
              :disabled="temperature >= maxFridgeTemperature"
            >
              <v-avatar color="blue">
                <v-icon>add</v-icon>
              </v-avatar>
            </v-btn>
          </div>
        </v-row>

        <br />
        <span> Fridge Mode</span>
        <v-row>
          <v-select
            dark
            label="Mode"
            :items="dropdownFridgeMode"
            menu-props="offsetOverflow, offsetY"
            v-model="mode"
          >
          </v-select>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-blur color="red" @click="Exit()">Cancel</v-btn>
      <v-btn v-blur color="blue" :disabled="!modified" @click="SaveAndExit()"
        >SAVE</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Fridge from "../../data/schemas/devices/Fridge";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "FridgeMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Fridge,
      required: true
    },
    show: {
      type: Boolean,
      required: true
      },
      mode:{
          type: String,
          required: true
      }
  },
  data: () => ({
    mode: "",
    temperature: 8,
    deleteDialog: false,
    freezerTemperature: 0
  }),
  computed: {
    dropdownFridgeMode() {
      return [
        {
          text: "Normal",
          value: "default"
        },
        {
          text: "Vacation",
          value: "vacation"
        },
        {
          text: "Party",
          value: "party"
        }
      ];
    },
    minFreezerTemperature() {
      return Fridge.minFreezerTemperature();
    },
    maxFreezerTemperature() {
      return Fridge.maxFreezerTemperature();
    },
    minFridgeTemperature() {
      return Fridge.minFridgeTemperature();
    },
    maxFridgeTemperature() {
      return Fridge.maxFridgeTemperature();
    },

    modified() {
      if (this.device == null) return false;
      return (
        this.device.temperature !== this.temperature ||
        this.device.mode !== this.mode ||
        this.device.freezerTemperature !== this.freezerTemperature
      );
    }
  },
  methods: {
    async resetData() {
      if (this.device != null) {
        await this.device.refreshState();
        this.temperature = this.device.temperature;
        this.mode = this.device.mode;
        this.freezerTemperature = this.device.freezerTemperature;
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
      await this.device.setMode(this.mode);
      await this.device.setTemperature(this.temperature);
      await this.device.setFreezerTemperature(this.freezerTemperature);
      this.$store.state.loading = false;
      this.Exit();
    },
    Exit() {
      console.log("Sending Close Event from Fridge");
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

<style scoped>
.buttonsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.buttonLeft {
  left: 12%;
  top: -10px;
}
.buttonRight {
  right: 12%;
  top: -10px;
}
</style>
