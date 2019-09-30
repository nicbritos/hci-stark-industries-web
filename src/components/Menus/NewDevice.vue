<template>
  <v-card>
    <!--    <v-img-->
    <!--      class="white&#45;&#45;text"-->
    <!--      src="@/assets/response_blue.png"-->
    <!--      position="top center"-->
    <!--      max-height="300"-->
    <!--    >-->
    <!--    </v-img>-->
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col>
            <h1 style="color: black">New Device</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-stepper vertical class="elevation-0" v-model="stepper">
      <template>
        <v-stepper-step
          v-if="region == null"
          step="1"
          :rules="[() => stepper !== 1 || !error]"
          :complete="stepper > 1 && !error"
        >
          Select Region
        </v-stepper-step>

        <v-stepper-content v-if="region == null" step="1">
          <v-row>
            <v-col>
              <v-select
                v-model="selectedRegion"
                :items="regions"
                label="Select Region"
                item-value="id"
                item-text="name"
                clearable
                id="region-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Region not found"
                :error="error"
                :error-messages="errorMessages"
                @change="validateRegion"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                text
                v-blur
                color="primary"
                @click="stepper++"
                :disabled="error || selectedRegion == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          v-if="room == null"
          step="2"
          :rules="[() => stepper !== 2 || !error]"
          :complete="stepper > 2 && !error"
        >
          Select Room
        </v-stepper-step>

        <v-stepper-content v-if="room == null" step="2">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(selectedRegion)
                  }}'
                </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                v-model="selectedRoom"
                :items="rooms"
                label="Select Room"
                item-value="id"
                item-text="name"
                clearable
                id="room-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Room not found"
                :error="error"
                :error-messages="errorMessages"
                @change="validateRoom"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                v-if="region == null"
                text
                v-blur
                color="primary"
                @click="backOneStep"
                >Back</v-btn
              >
              <v-btn
                text
                v-blur
                color="primary"
                @click="stepper++"
                :disabled="error || selectedRoom == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          step="3"
          :rules="[() => stepper !== 3 || !error]"
          :complete="stepper > 3 && !error"
        >
          Select Device
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(selectedRegion)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                and Room:
                <span class="blue--text"
                  >'{{
                    region != null
                      ? getRoomName(room)
                      : getRoomName(selectedRoom)
                  }}'
                </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                v-model="device"
                :items="devices"
                label="Select Device"
                item-value="id"
                item-text="name"
                clearable
                id="device-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Room not found"
                :error="error"
                :error-messages="errorMessages"
                @change="validateDevice"
              ></v-select>
            </v-col> </v-row
          ><v-row>
            <v-col>
              <v-spacer> </v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                text
                v-if="room == null"
                v-blur
                color="primary"
                @click="backOneStep"
                >Back</v-btn
              >
              <v-btn
                text
                v-blur
                color="primary"
                @click="stepper++"
                :disabled="error || device == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          step="4"
          :rules="[() => stepper !== 4 || !error]"
          :complete="stepper > 4 && !error"
        >
          Name
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(selectedRegion)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                Room:
                <span class="blue--text"
                  >'{{
                    region != null
                      ? getRoomName(room)
                      : getRoomName(selectedRoom)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                and Device:
                <span class="blue--text"> '{{ getDeviceName(device) }}' </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="name"
                label="Enter Name"
                clearable
                :error="error"
                :error-messages="errorMessages"
                @input="validateName(name)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn text v-blur color="primary" @click="backOneStep"
                >Back</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
      </template>
    </v-stepper>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="onCancel" v-blur>Cancel</v-btn>
      <v-btn
        :disabled="stepper < 4 || error || name == null"
        color="blue darken-1"
        text
        @click="onSave"
        v-blur
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewDevice",
  model: {
    events: ["cancel", "save"]
  },
  props: {
    room: {
      type: String,
      required: false
    },
    region: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      stepper: 1,
      selectedRegion: null,
      selectedRoom: null,
      name: null,
      device: null,
      error: false,
      errorMessages: []
    };
  },
  computed: {
    regions() {
      return [
        {
          name: "Planta Baja",
          id: "ABC1"
        }
      ];
    },
    rooms() {
      return [
        {
          name: "Comedor",
          id: "ABC2"
        }
      ];
    },
    devices() {
      return [
        {
          name: "Light",
          id: "L"
        },
        {
          name: "Air Conditioner",
          id: "AC"
        }
      ];
    }
  },
  methods: {
    backOneStep() {
      if (this.stepper === 4) {
        this.stepper--;
        this.name = null;
      } else if (this.stepper === 3) {
        if (this.room == null) {
          this.stepper--;
          this.device = null;
        }
      } else if (this.stepper === 2) {
        if (this.region == null) {
          this.stepper--;
          this.room = null;
        }
      }

      this.error = false;
      this.errorMessages = [];
    },

    getRegionName(regionId) {
      return "Planta Baja";
    },
    getRoomName(roomId) {
      return "Comedor";
    },
    getDeviceName(deviceId) {
      if (deviceId === "L") return "Light";
      if (deviceId === "AC") return "Air Conditioner";
      return "N/A";
    },

    validateRegion() {
      let messages = [];
      if (this.selectedRegion == null) messages.push("Please, select a Region");
      this.errorMessages = messages;
      this.error = messages.length > 0;
    },
    validateRoom() {
      let messages = [];
      if (this.selectedRoom == null) messages.push("Please, select a Room");
      this.errorMessages = messages;
      this.error = messages.length > 0;
    },
    validateDevice() {
      let messages = [];
      if (this.device == null) messages.push("Please, select a Device");
      this.errorMessages = messages;
      this.error = messages.length > 0;
    },
    validateName(name) {
      let messages = [];
      if (typeof name !== "string" || name.trim().length === 0)
        messages.push("Please, enter a Name");
      this.errorMessages = messages;
      this.error = messages.length > 0;
    },

    onCancel() {
      this.$emit("cancel");
    },
    onSave() {
      let newDevice = {
        region: this.region != null ? this.region : this.selectedRegion,
        room: this.room != null ? this.room : this.selectedRoom,
        device: this.device,
        name: this.name
      };
      this.$emit("save", newDevice);
    }
  }
};
</script>

<style scoped></style>
