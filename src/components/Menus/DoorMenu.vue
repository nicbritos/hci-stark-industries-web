<template>
  <v-dialog v-model="DoorMenu" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Door</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn icon absolute right @click="DoorMenu = false">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text clas="text-center">
        <v-container>
          <v-row>
              <v-col>

                <v-row class=" mb-6 " justify="center"  no-gutters>
                    <v-avatar color="green" size="50">
                      <v-img :src="currentSecurityImage" />
                    </v-avatar>
                </v-row>

                <v-row class=" mb-6 " justify="center" no-gutters>
                  <v-img
                    max-width="100"
                    max-height="300"
                    :src="CurrentDoorImage"
                  />
                </v-row>

              </v-col>
            <v-col >
                <div class="buttonsContainer">
                  <v-btn
                    color="blue"
                    class="text-center"
                    :disabled="!enableOpenCloseButton"
                    @click="ChangeDoorState()"
                  >
                    {{ this.currentOpenCloseButtonString }}
                  </v-btn>

                  <v-btn
                    color="blue"
                    class="text-center"
                    :disabled="!enableLockUnlockButton"
                    @click="ChangeSecurityState()"
                  >
                    {{ this.currentLockUnlockButtonString }}
                  </v-btn>
                </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="DoorMenu = false">Cancel</v-btn>
          <v-btn color="blue" @click="DoorMenu = false">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DoorMenu",

  props: ["name"],

  data: () => ({
    DoorMenu: false,

    closedDoorImage: "img/devices/ClosedDoor.svg",
    openDoorImage: "img/devices/OpenDoor.svg",
    lockDoorImage: "img/devices/DoorLock.svg",
    unlockDoorImage: "img/devices/DoorUnlock.svg",

    currentSecurityImage: "img/devices/DoorUnlock.svg",
    CurrentDoorImage: "img/devices/OpenDoor.svg",

    OpenButtonString: "Open Door",
    CloseButtonString: "Close Door",

    currentOpenCloseButtonString: "Close Door",

    LockButtonString: "Lock Door",
    UnlockButtonString: "Unlock Door",

    enableOpenCloseButton: true,
    enableLockUnlockButton: false,

    currentLockUnlockButtonString: "Lock Door"
  }),
  methods: {
    ChangeDoorState() {
      if (this.currentOpenCloseButtonString === this.OpenButtonString) {
        this.SetOpenState();
      } else if (this.currentOpenCloseButtonString === this.CloseButtonString) {
        this.SetCloseState();
      }
    },
    SetOpenState() {
      this.CurrentDoorImage = this.openDoorImage;
      this.currentOpenCloseButtonString = this.CloseButtonString;
      this.enableLockUnlockButton = false;
    },
    SetCloseState() {
      this.CurrentDoorImage = this.closedDoorImage;
      this.currentOpenCloseButtonString = this.OpenButtonString;
      this.enableLockUnlockButton = true;
    },
    ChangeSecurityState() {
      if (this.currentLockUnlockButtonString === this.LockButtonString) {
        this.SetLockState();
      } else if (
        this.currentLockUnlockButtonString === this.UnlockButtonString
      ) {
        this.SetUnlockState();
      }
    },
    SetUnlockState() {
      this.enableOpenCloseButton = true;
      this.currentLockUnlockButtonString = this.LockButtonString;
      this.currentSecurityImage = this.unlockDoorImage;
    },
    SetLockState() {
      this.enableOpenCloseButton = false;
      this.currentLockUnlockButtonString = this.UnlockButtonString;
      this.currentSecurityImage = this.lockDoorImage;

    }
  }
};
</script>

<style scoped>

    .buttonsContainer{
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-content: space-between;
    }

</style>
