<template>
  <v-container grid-list-md fluid>
    <NewRoom
      :show="dialogs.rooms.new"
      :regions="regions"
      @closeClick="onNewRoomClose"
    ></NewRoom>
    <NewRegion
      :regions="regions"
      :show="dialogs.regions.new"
      @closeClick="onNewRegionClose"
    ></NewRegion>
    <EditRegion
      :regions="regions"
      :region="editRegion"
      :show="dialogs.regions.edit"
      @closeClick="onEditRegionClose"
    ></EditRegion>
    <DeleteDialog
      :name="deleteRegion ? deleteRegion.name : ''"
      :show="dialogs.regions.delete"
      @closeClick="onDeleteRegionClose"
    ></DeleteDialog>

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
          <v-expansion-panels popout>
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
  }
};
</script>

<style scoped></style>
