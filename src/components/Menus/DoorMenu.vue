<template>
  <v-dialog v-model="DoorMenu" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Door</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn icon absolute right @click="DeleteAndExit()">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text clas="text-center">
        <v-container>
          <v-row>
            <v-col>
              <v-row class=" mb-6 " justify="center" no-gutters>
                <v-avatar color="green" size="50">
                  <v-img :src="this.SecurityRepresentation.image" />
                </v-avatar>
              </v-row>

              <v-row class=" mb-6 " justify="center" no-gutters>
                <v-img
                  max-width="100"
                  max-height="300"
                  :src="this.StatusRepresentation.image"
                />
              </v-row>
            </v-col>
            <v-col>
              <div class="buttonsContainer">
                <v-btn
                  color="blue"
                  class="text-center"
                  :disabled="!this.StatusRepresentation.btnEnabled"
                  @click="ChangeDoorState()"
                >
                  {{ this.StatusRepresentation.btnString }}
                </v-btn>

                <v-btn
                  color="blue"
                  class="text-center"
                  :disabled="!this.SecurityRepresentation.btnEnabled"
                  @click="ChangeSecurityState()"
                >
                  {{ this.SecurityRepresentation.btnString }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="Exit()">Cancel</v-btn>
          <v-btn color="blue" @click="SaveAndExit()">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import Door from "../../data/schemas/devices/Door";
export default {
  name: "DoorMenu",

  props: {
    name: {
      type: String,
      required: true
    },
    deviceId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    DoorMenu: false,

    State: {
      open: true,
      locked: false
    },

    SecurityRepresentation: {
      btnString: "",
      btnEnabled: false,
      image: ""
    },

    StatusRepresentation: {
      btnString: "",
      btnEnabled: true,
      image: ""
    },

    closedDoorImage: "img/devices/ClosedDoor.svg",
    openDoorImage: "img/devices/OpenDoor.svg",

    lockDoorImage: "img/devices/DoorLock.svg",
    unlockDoorImage: "img/devices/DoorUnlock.svg",

    OpenButtonString: "Open Door",
    CloseButtonString: "Close Door",

    LockButtonString: "Lock Door",
    UnlockButtonString: "Unlock Door"
  }),
  methods: {
    ChangeDoorState() {
      if (!this.State.open) {
        this.SetOpenState();
      } else if (this.State.open) {
        this.SetCloseState();
      }
    },
    SetOpenState() {
      this.StatusRepresentation.image = this.openDoorImage;
      this.StatusRepresentation.btnString = this.CloseButtonString;
      this.SecurityRepresentation.btnEnabled = false;
      this.State.open = true;
    },
    SetCloseState() {
      this.StatusRepresentation.image = this.closedDoorImage;
      this.StatusRepresentation.btnString = this.OpenButtonString;
      this.SecurityRepresentation.btnEnabled = true;
      this.State.open = false;
    },
    ChangeSecurityState() {
      if (!this.State.locked) {
        this.SetLockState();
      } else if (this.State.locked) {
        this.SetUnlockState();
      }
    },
    SetUnlockState() {
      this.StatusRepresentation.btnEnabled = true;
      this.SecurityRepresentation.btnString = this.LockButtonString;
      this.SecurityRepresentation.image = this.unlockDoorImage;
      this.State.locked = false;
    },
    SetLockState() {
      this.StatusRepresentation.btnEnabled = false;
      this.SecurityRepresentation.btnString = this.UnlockButtonString;
      this.SecurityRepresentation.image = this.lockDoorImage;
      this.State.locked = true;
    },
    async LoadModel() {

      var APIDoor = new Door(this.deviceId,this.name);

      console.log("Model");

      await APIDoor.refreshState();
      console.log(APIDoor);


      if (APIDoor.isOpen) {
        this.SetOpenState();
      } else {
        this.SetCloseState();
      }

      if (APIDoor.isLocked) {
        this.SetLockState();
      } else {
        this.SetUnlockState();
      }
    },
    async SaveAndExit() {
      var APIDoor = new Door(this.deviceId,this.name);
      await  APIDoor.refreshState();
      console.log(APIDoor);

      if (this.State.open) {
        console.log("Open Door");
        APIDoor.open();
        APIDoor.unlock();

      } else {
        APIDoor.close();
        if (this.State.locked) {
          APIDoor.lock();
        } else {
          APIDoor.unlock();
        }
      }

      this.Exit();
    },
    Exit() {
      this.DoorMenu = false;
    },
    DeleteAndExit() {

      var APIDoor = new Door(this.deviceId,this.name);

      APIDoor.delete();

      this.Exit();
    }
  },
  watch: {
    DoorMenu: function(val) {
      if (val) {
        this.LoadModel();
      }
    }
  },
};
</script>

<style scoped>
.buttonsContainer {
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-content: space-between;
}
</style>
