<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.rooms.new" max-width="700px">
      <NewRoom
        :show="dialogs.rooms.new"
        :regions="regions"
        @closeClick="onNewRoomClose"
      ></NewRoom>
    </v-dialog>
    <v-dialog v-model="dialogs.regions.new" max-width="700px">
      <NewRegion
        :show="dialogs.regions.new"
        :regions="regions"
        @closeClick="onNewRegionClose"
      ></NewRegion>
    </v-dialog>
    <v-dialog v-model="dialogs.regions.edit" max-width="700px">
      <EditRegion
        :show="dialogs.regions.edit"
        :regions="regions"
        :region="editRegion"
        @closeClick="onEditRegionClose"
      ></EditRegion>
    </v-dialog>
    <v-dialog v-model="dialogs.regions.delete" max-width="700px">
      <DeleteDialog
        :show="dialogs.regions.delete"
        :name="deleteRegion ? deleteRegion.name : ''"
        @closeClick="onDeleteRegionClose"
      ></DeleteDialog>
    </v-dialog>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Regions
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            text
            outlined
            color="primary"
            class="ml-3 mb-2"
            v-on="on"
            v-blur
            @click="onNewRegionOpen"
            >NEW REGION</v-btn
          >
        </v-toolbar>
        <v-container fluid>
          <v-expansion-panels popout :value="expandRegionIndex">
            <Region
              v-for="item of regions"
              :key="item.id"
              :region="item"
              @edit="onEditRegionOpen(item)"
              @delete="onDeleteRegionOpen(item)"
              @newRoom="onNewRoomOpen(item)"
            ></Region>
          </v-expansion-panels>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Region from "@/components/individuals/Region";
import RegionSchema from "../data/schemas/Region";
import NewRoom from "../components/action_menus/rooms/NewRoom";
import NewRegion from "../components/action_menus/regions/NewRegion";
import EditRegion from "../components/action_menus/regions/EditRegion";
import DeleteDialog from "../components/info_dialogs/DeleteDialog";

export default {
  name: "Regions",
  components: { Region, NewRoom, NewRegion, EditRegion, DeleteDialog },
  data() {
    return {
      on: false,
      regions: [],
      editRegion: null,
      deleteRegion: null,
      newRoomRegion: null,
      expandRegionIndex: null,
      dialogs: {
        regions: {
          new: false,
          edit: false,
          delete: false
        },
        rooms: {
          new: false
        }
      }
    };
  },
  methods: {
    onNewRegionOpen() {
      this.dialogs.regions.new = true;
    },
    async onNewRegionClose(region) {
      if (region) {
        this.$store.state.loading = true;

        this.regions.push(await RegionSchema.create(region.name));

        this.$store.state.loading = false;
      }

      this.dialogs.regions.new = false;
    },

    onEditRegionOpen(region) {
      this.editRegion = region;
      this.dialogs.regions.edit = true;
    },
    async onEditRegionClose(region) {
      if (region) {
        this.$store.state.loading = true;

        await this.editRegion.changeName(region.name);

        this.$store.state.loading = false;
      }

      this.dialogs.regions.edit = false;
    },

    onDeleteRegionOpen(region) {
      this.deleteRegion = region;
      this.dialogs.regions.delete = true;
    },
    async onDeleteRegionClose(value) {
      if (value) {
        this.$store.state.loading = true;

        if (await this.deleteRegion.delete()) {
          this.regions.splice(this.regions.indexOf(this.deleteRegion), 1);
        }
        this.deleteRegion = null;

        this.$store.state.loading = false;
      }

      this.dialogs.regions.delete = false;
    },

    onNewRoomOpen(region) {
      this.newRoomRegion = region;
      this.dialogs.rooms.new = true;
    },
    async onNewRoomClose(room) {
      if (room) {
        this.$store.state.loading = true;

        await this.newRoomRegion.createRoom(room.name);

        this.$store.state.loading = false;
      }

      this.dialogs.rooms.new = false;
    }
  },
  async mounted() {
    this.regions = await RegionSchema.getAll();
    for (let region of this.regions) {
      for (let room of region.rooms) {
        await room._loadDevices();
      }
    }

    if (this.$router.currentRoute.params.regionId) {
      for (let i = 0; i < this.regions.length; i++) {
        let region = this.regions[i];
        if (region.id === this.$router.currentRoute.params.regionId) {
          this.expandRegionIndex = i;
          break;
        }
      }
    }
  }
};
</script>

<style scoped></style>
