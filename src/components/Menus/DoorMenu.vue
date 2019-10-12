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

        <v-btn icon absolute right @click="openDeleteDialog" v-if="mode === 'edit'">
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
          <v-btn color="red" @click="Exit(false)">Cancel</v-btn>
          <v-btn color="blue" :disabled="mode === 'edit' && !modified" @click="SaveAndExit()">SAVE</v-btn>
        </div>
      </v-card-actions>
    </v-card>
</template>

<script>
import Door from "../../data/schemas/devices/Door";
import ImageRetriever from "../../data/ImageRetriever";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "DoorMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Door,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: 'edit'
    }
  },

  data: () => ({
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

    closedDoorImage: ImageRetriever.GetImages(
      "lsf78ly0eqrjbz91",
      ImageRetriever.ACTIONS.CLOSE
    ),
    openDoorImage: ImageRetriever.GetImages(
      "lsf78ly0eqrjbz91",
      ImageRetriever.ACTIONS.OPEN
    ),

    lockDoorImage: ImageRetriever.GetImages(
      "lsf78ly0eqrjbz91",
      ImageRetriever.ACTIONS.LOCK
    ),
    unlockDoorImage: ImageRetriever.GetImages(
      "lsf78ly0eqrjbz91",
      ImageRetriever.ACTIONS.UNLOCK
    ),

    OpenButtonString: "Open Door",
    CloseButtonString: "Close Door",

    LockButtonString: "Lock Door",
    UnlockButtonString: "Unlock Door",
    deleteDialog: false
  }),
  computed: {
    modified() {
      if (this.device == null)
        return false;
      return (this.State.open !== this.device.isOpen || this.State.locked !== this.device.isLocked ) ;
    }
  },
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
    async resetData() {
      if (this.device != null) {
        await this.device.refreshState();
        if (this.device.isOpen) {
          this.SetOpenState();
        } else {
          this.SetCloseState();
        }

        if (this.device.isLocked) {
          this.SetLockState();
        } else {
          this.SetUnlockState();
        }
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

      if(this.mode === 'edit') {
        if (this.State.open) {
          await this.device.open();
          await this.device.unlock();
        } else {
          await this.device.close();
          if (this.State.locked) {
            await this.device.lock();
          } else {
            await this.device.unlock();
          }
        }
      }

      this.$store.state.loading = false;

      this.Exit(true);
    },
    Exit(confirm) {
      console.log("Sending Close Event from Door")
      this.$emit('CloseMenu',{
        confirmed: confirm,
        deviceId: this.device.deviceId,
        name: this.device.name,
        id: this.device.id,
        customState: this.State
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

<style scoped>
.buttonsContainer {
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-content: space-between;
}
</style>
