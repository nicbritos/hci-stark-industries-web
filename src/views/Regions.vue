<template>
  <v-container grid-list-md fluid>
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
              @delete="onDeleteRegionOpen"
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
import NewRegion from "../components/action_menus/regions/NewRegion";
import EditRegion from "../components/action_menus/regions/EditRegion";

export default {
  name: "Regions",
  components: { Region, NewRegion, EditRegion },
  data() {
    return {
      on: false,
      regions: [],
      editRegion: null,
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
    onNewRegionClose(data) {
      console.log(data);
      this.dialogs.regions.new = false;
    },

    onEditRegionOpen(region) {
      this.editRegion = region;
      this.dialogs.regions.edit = true;
    },
    onEditRegionClose(data) {
      console.log(data);
      this.dialogs.regions.edit = false;
    },

    onDeleteRegionOpen() {
      this.dialogs.regions.delete = true;
    },
    onDeleteRegionClose(data) {
      console.log(data);
      this.dialogs.regions.delete = false;
    },

    onNewRoomOpen(region) {
      this.newRoomRegion = region;
      this.dialogs.rooms.new = true;
    },
    onNewRoomClose(data) {
      console.log(data);
      this.dialogs.rooms.new = false;
    }
  },
  async mounted() {
    this.regions = await RegionSchema.getAll();
  }
};
</script>

<style scoped></style>
