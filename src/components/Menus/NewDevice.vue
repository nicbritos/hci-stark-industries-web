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
              <v-selects
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
              ></v-selects>
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
          <v-row>
            <v-col>
              <v-selects
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
              ></v-selects>
            </v-col> </v-row
          ><v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                v-if="region != null"
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
          :rules="[() => stepper !== 2 || !error]"
          :complete="stepper > 2 && !error"
        >
          Select Room
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-row>
            <v-col>
              <v-selects
                v-model="device"
                :items="devices"
                label="Select Device"
                item-value="id"
                item-text="name"
                clearable
                id="room-id"
                menu-props="offsetY, offsetOverflow"
                no-data-text="Room not found"
                :error="error"
                :error-messages="errorMessages"
                @change="validateDevice"
              ></v-selects>
            </v-col> </v-row
          ><v-row>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="auto">
              <v-btn
                text
                v-if="room != null"
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
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                label="Enter a Name"
                clearable
                :error="error"
                :error-messages="errorMessages"
                @change="validateName(name)"
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
      <v-btn color="blue darken-1" text @click="" v-blur>Cancel</v-btn>
      <v-btn
        :disabled="stepper < 4 || error || name == null"
        color="blue darken-1"
        text
        @click=""
        v-blur
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewDevice",
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
        if (this.room != null) {
          this.stepper--;
          this.device = null;
        }
      } else if (this.stepper === 2) {
        if (this.region != null) {
          this.stepper--;
          this.room = null;
        }
      }

      this.error = false;
      this.errorMessages = [];
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
      return true;
    }
  }
};
</script>

<style scoped></style>
