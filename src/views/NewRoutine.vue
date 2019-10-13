<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.devices.add" max-width="800px">
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col>
                <h1 style="color: black">Add Device</h1>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <DeviceContainer
                  :room="true"
                  :editable="false"
                  :pick="true"
                  :items="devices"
                  @pick="addDeviceClose"
                  mode="routine"
                  v-on:CloseMenu="AddDeviceToList"
                >
                </DeviceContainer>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addDeviceClose(null)" v-blur
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogs.devices.configure" max-width="800px">
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col>
                <h1 style="color: black">
                  Configure Device: {{ selectedDevice.name }}
                </h1>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                CONFIGURAR
              </v-col>
            </v-row>
            <DeviceSelector
                    :device="selectedDevice"
                    :show="dialogs.devices.configure"
                    mode="routine"
                    v-on:CloseMenu="configureDeviceClose"
            ></DeviceSelector>

<!--          <Device-->
<!--                  :editable="true"-->
<!--                  :selectable="false"-->
<!--                  :room="true"-->
<!--                  :device="this.selectedDevice"-->
<!--                  mode="routine"-->
<!--                  v-on:CloseMenu="configureDeviceClose"-->
<!--          ></Device>-->
          </v-container>
        </v-card-text>

<!--        <v-card-actions>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn-->
<!--            color="blue darken-1"-->
<!--            text-->
<!--            @click="configureDeviceClose(false)"-->
<!--            v-blur-->
<!--            >Cancel</v-btn-->
<!--          >-->
<!--          <v-btn-->
<!--            color="blue darken-1"-->
<!--            text-->
<!--            @click="configureDeviceClose(true)"-->
<!--            v-blur-->
<!--            >Save</v-btn-->
<!--          >-->
<!--        </v-card-actions>-->
      </v-card>
    </v-dialog>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              New Routine
            </h2>
          </v-toolbar-title>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-stepper vertical v-model="data.stepper">
          <template>
            <v-stepper-step
              step="1"
              :rules="[() => data.stepper !== 1 || !data.error]"
              :complete="data.stepper > 1 && !data.error"
            >
              Enter Name
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="data.name"
                    label="Enter Name"
                    clearable
                    :error="data.error"
                    :error-messages="data.errorMessages"
                    @input="validateName(data.name)"
                  ></v-text-field>
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
                    :disabled="data.error || data.name == null"
                    >Continue</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-step
              step="2"
              :rules="[() => data.stepper !== 2 || !data.error]"
              :complete="data.stepper > 2 && !data.error"
            >
              Enter Description
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-row dense>
                <v-col>
                  <span class="text--secondary">
                    For Routine:
                    <span class="blue--text">'{{ data.name }}'</span>
                  </span>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="data.description"
                    label="Enter Description"
                    clearable
                    :error="data.error"
                    :error-messages="data.errorMessages"
                    @input="validateDescription(data.description)"
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
                  <v-btn
                    text
                    v-blur
                    color="primary"
                    @click="data.stepper++"
                    :disabled="data.error || data.description == null"
                    >Continue</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-step
              step="3"
              :rules="[() => data.stepper !== 3 || !data.error]"
              :complete="data.stepper > 3 && !data.error"
            >
              Select Devices
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-row dense>
                <v-col>
                  <span class="text--secondary">
                    For Routine:
                    <span class="blue--text">'{{ data.name }}'</span>
                  </span>
                  <div class="text--secondary">
                    <u>Note</u>: actions on Devices will be executed in order.
                  </div>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col> </v-col>
                <v-col cols="auto">
                  <v-btn
                    text
                    outlined
                    color="primary"
                    class="ml-3 mb-2"
                    v-blur
                    @click="addDeviceOpen"
                    >ADD DEVICE</v-btn
                  >
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <OrderedBoxContainer :items="SelectedDevicesToShow">
                    <template v-slot:item="{ item }">
                      <Device
                        :room="true"
                        :editable="false"
                        :device="item"
                      ></Device>
                    </template>
                  </OrderedBoxContainer>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-spacer> </v-spacer>
                </v-col>
                <v-col cols="auto">
                  <v-btn text v-blur color="primary" @click="backOneStep"
                    >Back</v-btn
                  >
                  <v-btn
                    text
                    v-blur
                    color="primary"
                    @click="data.stepper++"
                    :disabled="data.error || selectedDevices.length === 0"
                    >Continue</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>
          </template>
        </v-stepper>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-spacer></v-spacer>
      </v-col>

      <v-col cols="auto">
        <v-btn color="blue darken-1" text @click="onCancel" v-blur
          >Cancel</v-btn
        >
        <v-btn
          :disabled="
            data.stepper < 4 || data.error || selectedDevices.length === 0
          "
          color="blue darken-1"
          text
          @click="onSave"
          v-blur
          :loading="data.loading"
          >Save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderedBoxContainer from "@/components/containers/OrderedBoxContainer";
import DeviceContainer from "@/components/containers/DeviceContainer";
import Device from "@/components/individuals/Device";
import CommonDeviceSchema from "../data/schemas/devices/CommonDeviceSchema";
import DeviceSelector from "../components/containers/DeviceSelector";
import RoutineHelper from "../data/RoutineHelper";
import Routine from "../data/schemas/Routine";

export default {
  name: "NewRoutine",
  components: { OrderedBoxContainer, DeviceContainer, Device,DeviceSelector },
  model: {
    events: ["cancel", "save"]
  },
  data() {
    return {
      data: {},
      dialogs: {
        devices: {
          add: false,
          configure: false
        }
      },
      devices: [],
      selectedDevice: {},
      selectedDevices: [],
      SelectedDevicesToShow: [],
      selectedDeviceConfiguration: {}
    };
  },
  computed: {
    defaultData() {
      return {
        stepper: 1,
        description: null,
        name: null,
        selectedDevices: [],
        error: false,
        errorMessages: [],
        loading: false
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
    }
  },
  created() {
    this.resetData();
  },
  async mounted() {
    this.devices = await CommonDeviceSchema.getAll();
  },
  methods: {
    AddDeviceToList(ev){

      this.selectedDevices.push(ev);
      this.addDeviceClose(null);


    },
    addDeviceOpen() {
      this.openDialog(this.dialogs.devices, "add");
    },
    addDeviceClose(item) {
      // Save to DB
      if (item != null) {

        this.configureDeviceOpen();
        this.selectedDevice = item;

      } else {
        this.closeDialog(this.dialogs.devices, "add");
      }
    },
    configureDeviceOpen() {
      this.openDialog(this.dialogs.devices, "configure");
      this.openDialog(this.dialogs.devices, "add");
    },
    configureDeviceClose(result) {
      // Save to DB


      if (result.confirmed) { // result


        this.selectedDevices.push(result);
        this.SelectedDevicesToShow.push(this.selectedDevice);
        this.closeDialog(this.dialogs.devices, "configure");
        this.closeDialog(this.dialogs.devices, "add");
      } else {

        this.closeDialog(this.dialogs.devices, "configure");
      }


    },

    openDialog(item, type) {
      if (item == null || type == null || item[type] == null)
        return;
      if (!item[type])
        item[type] = true;


    },
    closeDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (item[type]) item[type] = false;
    },

    resetData() {
      this.data = Object.assign({}, this.defaultData);
    },
    backOneStep() {
      if (this.data.stepper === 4) {
        this.data.stepper--;
        this.data.name = null;
      } else if (this.data.stepper === 3) {
        if (this.room == null) {
          this.data.stepper--;
          this.data.device = null;
        }
      } else if (this.data.stepper === 2) {
        if (this.region == null) {
          this.data.stepper--;
          this.selectedRoom = null;
        }
      }

      this.data.error = false;
      this.data.errorMessages = [];
    },

    getDeviceName(deviceId) {
      if (deviceId === "L") return "Light";
      if (deviceId === "AC") return "Air Conditioner";
      return "N/A";
    },

    validateName(name) {
      let messages = [];
      if (typeof name !== "string" || name.trim().length === 0)
        messages.push("Please, enter a Name");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },
    validateDescription(description) {
      let messages = [];
      if (typeof description !== "string" || description.trim().length === 0)
        messages.push("Please, enter a Description");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },
    validateDevices() {
      let messages = [];
      if (this.data.devices.length === 0)
        messages.push("Please, select at least one Device");
      this.data.errorMessages = messages;
      this.data.error = messages.length > 0;
    },

    onCancel() {
      this.$emit("cancel");
    },
    async onSave() {


      let actions = this.selectedDevices.map(el=> {return RoutineHelper.GetActionsForDevice(el)}).flat(Infinity);





      this.data.loading = true;


      let temp = await Routine.create(this.data.name,this.data.description,actions);


      this.data.loading = false;


      this.$router.push({
        name:"routines"
      });


    }
  }
};
</script>

<style scoped></style>
