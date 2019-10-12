<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col>
            <h1 style="color: black">New Device</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-stepper vertical class="elevation-0" v-model="data.stepper">
      <template>
        <v-stepper-step
          v-if="region == null"
          step="1"
          :rules="[() => data.stepper !== 1 || !data.error]"
          :complete="data.stepper > 1 && !data.error"
        >
          Select Region
        </v-stepper-step>

        <v-stepper-content v-if="region == null" step="1">
          <v-row>
            <v-col>
              <v-select
                v-model="data.selectedRegion"
                :items="regions"
                label="Select Region"
                item-value="id"
                item-text="name"
                clearable
                id="region-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Region not found"
                :error="data.error"
                :error-messages="data.errorMessages"
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
                @click="data.stepper++"
                :disabled="data.error || data.selectedRegion == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          v-if="room == null"
          :step="roomStep"
          :rules="[() => data.stepper !== roomStep || !data.error]"
          :complete="data.stepper > roomStep && !data.error"
        >
          Select Room
        </v-stepper-step>

        <v-stepper-content v-if="room == null" :step="roomStep">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(data.selectedRegion)
                  }}'
                </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                v-model="data.selectedRoom"
                :items="rooms"
                label="Select Room"
                item-value="id"
                item-text="name"
                clearable
                id="room-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Room not found"
                :error="data.error"
                :error-messages="data.errorMessages"
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
                @click="data.stepper++"
                :disabled="data.error || data.selectedRoom == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          :step="deviceStep"
          :rules="[() => data.stepper !== deviceStep || !data.error]"
          :complete="data.stepper > deviceStep && !data.error"
        >
          Select Device Type
        </v-stepper-step>

        <v-stepper-content :step="deviceStep">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(data.selectedRegion)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                and Room:
                <span class="blue--text"
                  >'{{
                    region != null
                      ? getRoomName(room)
                      : getRoomName(data.selectedRoom)
                  }}'
                </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                v-model="data.deviceId"
                :items="devices"
                label="Select Device Type"
                item-value="id"
                item-text="name"
                clearable
                menu-props="offsetY, offsetOverflow"
                :error="data.error"
                :error-messages="data.errorMessages"
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
                @click="data.stepper++"
                :disabled="data.error || data.deviceId == null"
                >Continue</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step
          :step="nameStep"
          :rules="[() => data.stepper !== nameStep || !data.error]"
          :complete="data.stepper > nameStep && !data.error"
        >
          Name
        </v-stepper-step>

        <v-stepper-content :step="nameStep">
          <v-row dense>
            <v-col>
              <span class="text--secondary">
                For Region:
                <span class="blue--text">
                  '{{
                    region != null
                      ? getRegionName(region)
                      : getRegionName(data.selectedRegion)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                Room:
                <span class="blue--text"
                  >'{{
                    region != null
                      ? getRoomName(room)
                      : getRoomName(data.selectedRoom)
                  }}',
                </span>
              </span>
              <span class="text--secondary">
                and Device Type:
                <span class="blue--text"> '{{ getDeviceName }}' </span>
              </span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="data.name"
                label="Name"
                @input="validateNewNameAndSave"
                @blur="validateNewNameAndSave"
                clearable
                :error="data.error"
                :error-messages="data.errorMessages"
                :counter="nameMaxLength"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                :disabled="data.loading"
                text
                v-blur
                color="primary"
                @click="backOneStep"
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
        :disabled="disableSaveButton"
        color="blue darken-1"
        text
        @click="onSave"
        v-blur
        :loading="data.loading"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import DeviceIds from "../../data/schemas/devices/DeviceIds";
import Region from "../../data/schemas/Region";
import Room from "../../data/schemas/Room";
import DataValidator from "../../data/DataValidator";
import apiWrapper from "../../data/apiWrapper";

export default {
  name: "NewDevice",
  model: {
    events: ["closeClick"]
  },
  props: {
    room: {
      type: Room,
      required: false
    },
    region: {
      type: Region,
      required: false
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      data: {},
      nameMaxLength: DataValidator.MAX_NAME_LENGTH,
      allDevices : []
    };
  },
  computed: {
    defaultData() {
      return {
        stepper: 1,
        selectedRegion: null,
        selectedRoom: null,
        name: null,
        deviceId: null,
        error: false,
        errorMessages: []
      };
    },
    roomStep() {
      if (this.region == null) return 2;
      return 1;
    },
    deviceStep() {
      if (this.region == null) return 3;
      if (this.room == null) return 2;
      return 1;
    },
    nameStep() {
      return this.deviceStep + 1;
    },
    disableSaveButton() {
      if (this.validateNewName().length !== 0) return true;
      return (
        this.data.stepper < this.nameStep ||
        this.data.error ||
        this.data.name == null
      );
    },

    devices() {
      let data = [];
      for (let type in DeviceIds.byType) {
        data.push({
          name: type,
          id: DeviceIds.byType[type]
        });
      }
      return data;
    },

    getDeviceName() {
      if (this.data.deviceId != null) {
        return this.devices.find(el => {
          return this.data.deviceId === el.id;
        }).name;
      }

      return "";
    },
  },
  watch: {
    value: function(val) {
      if (!val) {
        this.resetData();
      }
    }
  },
  methods: {
    validateNewNameAndSave() {
      this.data.errorMessages = this.validateNewName();
      this.data.error = this.data.errorMessages.length > 0;
      return this.data.errorMessages;
    },
    validateNewName() {
      let errorMessages = DataValidator.validateName(this.data.name, "Name");
      if (errorMessages.length === 0) {


        if(this.allDevices.some(el => {return el.name === this.data.name}))
          errorMessages.push("Name already exists");

      }

      return errorMessages;
    },
    resetData() {
      this.data = Object.assign({}, this.defaultData); // deep copy
    },
    backOneStep() {
      if (this.data.stepper === 4) {
        this.data.stepper--;
        this.data.name = null;
      } else if (this.data.stepper === 3) {
        if (this.room === null) {
          this.data.device = null;
        } else {
          this.data.name = null;
        }
        this.data.stepper--;
      } else if (this.data.stepper === 2) {
        if (this.region === null) {
          this.selectedRoom = null;
        } else if (this.room === null) {
          this.data.device = null;
        } else {
          this.data.name = null;
        }
        this.data.stepper--;
      }

      this.data.error = false;
      this.data.errorMessages = [];
    },

    getRegionName(region) {
      return region.name;
    },
    getRoomName(room) {
      return room.name;
    },

    validateRegion() {
      let messages = [];
      if (this.data.selectedRegion == null)
        messages.push("Please, select a Region");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },
    validateRoom() {
      let messages = [];
      if (this.data.selectedRoom == null)
        messages.push("Please, select a Room");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },
    validateDevice() {
      let messages = [];
      if (this.data.deviceId == null)
        messages.push("Please, select a Device Type");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },

    onCancel() {
      this.$emit("closeClick", null);
    },
    onSave() {
      let newDevice = {
        region: this.region != null ? this.region : this.data.selectedRegion,
        room: this.room != null ? this.room : this.data.selectedRoom,
        device: {
          id: this.data.deviceId,
          name: this.data.name
        }
      };
      this.data.loading = true;
      this.$emit("closeClick", newDevice);
    }
  },
  created() {
    this.resetData();
  },
  async mounted() {
    this.allDevices= await apiWrapper.devices.getAll()
  }
}
</script>

<style scoped></style>
