<template>
  <v-dialog v-model="DoorMenu" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Door</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ Name }}</span>

        <v-btn icon absolute right @click="DoorMenu = false">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="justify-center">
            <v-col>
              <v-img max-width="200" :src="CurrentDoorImage" />
            </v-col>
              <v-col cols="4">

                  <v-row>
                      <v-btn icon  @click="ChangeSecurityState()">
                          <v-avatar color="green">
                              <v-img :src="currentSecurityImage" />
                          </v-avatar>
                      </v-btn>

                  </v-row>


                <v-row>

                  <div class="text-center ">
                    <v-btn
                      color="blue"
                      :disabled="!enableOpenCloseButton"
                      @click="ChangeDoorState()"
                    >
                      {{ this.currentOpenCloseButtonString }}
                    </v-btn>
                    <v-btn
                      color="blue"
                      :disabled="!enableLockUnlockButton"
                      @click="ChangeSecurityState()"
                    >
                      {{ this.currentLockUnlockButtonString }}
                    </v-btn>
                  </div>
                </v-row>
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

  props: ["Name"],

  data: () => ({
    DoorMenu: false,

    closedDoorImage: "img/devices/ClosedDoor.svg",
    openDoorImage: "img/devices/OpenDoor.svg",
    lockDoorImage: "img/devices/DoorLock.svg",
    unlockDoorImage: "img/devices/DoorUnlock.svg",

      currentSecurityImage:"img/devices/DoorUnlock.svg",
    CurrentDoorImage: "img/devices/OpenDoor.svg",

    OpenButtonString: "Open Door",
    CloseButtonString: "Close Door",

    currentOpenCloseButtonString: "Close Door",

    LockButtonString: "Lock Door",
    UnlockButtonString: "Unlock Door",

    enableOpenCloseButton: true,
    enableLockUnlockButton: false,

    currentLockUnlockButtonString: "Unlock Door"
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
      this.currentOpenCloseButtonString = this.OpenButtonString;
      this.enableLockUnlockButton = false;
    },
    SetCloseState() {
      this.CurrentDoorImage = this.closedDoorImage;
      this.currentOpenCloseButtonString = this.CloseButtonString;
      this.enableLockUnlockButton = true;
    },
    ChangeSecurityState() {
      if (this.currentLockUnlockButtonString === this.LockButtonString) {
        this.SetUnlockState();
      } else if (
        this.currentLockUnlockButtonString === this.UnlockButtonString
      ) {
        this.SetLockState();
      }
    },
    SetUnlockState() {
      this.enableOpenCloseButton = true;
      this.currentLockUnlockButtonString = this.UnlockButtonString;
    },
    SetLockState() {
      this.enableOpenCloseButton = false;
      this.currentLockUnlockButtonString = this.LockButtonString;
    }
  }
};
</script>

<style scoped></style>
