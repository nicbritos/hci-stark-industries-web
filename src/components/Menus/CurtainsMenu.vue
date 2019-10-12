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

      <v-btn icon absolute right @click="openDeleteDialog()">
        <v-avatar color="red">
          <v-icon>delete</v-icon>
        </v-avatar>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row justify="space-between">
          <v-col>
            <img id="image" :src="device.image" />
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-btn
                :disabled="isOpen"
                width="50"
                height="60"
                color="blue"
                @click="isOpen = true"
              >
                <v-icon>
                  keyboard_arrow_up
                </v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <br />
            </v-row>
            <v-row>
              <v-btn
                :disabled="!isOpen"
                width="50"
                height="60"
                color="blue"
                @click="isOpen = false"
              >
                <v-icon>
                  keyboard_arrow_down
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-blur color="red" @click="Exit()">Cancel</v-btn>
      <v-btn v-blur color="blue" :disabled="!modified" @click="SaveAndExit()">SAVE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Blinds from "../../data/schemas/devices/Blinds";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "curtainsMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Blinds,
      required: false
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    deleteDialog: false,
    isOpen: false,
    level: 0
  }),
  computed: {
    modified() {
      return this.isOpen !== this.device.isOpen;
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
    async SaveAndExit() {
      this.$store.state.loading = true;
      if (this.isOpen) {
        await this.device.open();
      } else {
        await this.device.close();
      }
      this.$store.state.loading = false;

      this.Exit();
    },
    Exit() {
      console.log("Sending Close Event from Curtains");
      this.$emit("CloseMenu");
    },
    async resetData() {
      await this.device.refreshState();
      this.isOpen = this.device.isOpen;
      this.level = this.device.level;
    },
    onDelete() {
      this.$emit("delete");
    }
  },
  watch: {
    show: function(val) {
      if (val) this.resetData();
    }
  },
  mounted() {
    this.resetData();
  }
};
</script>

<style scoped></style>
