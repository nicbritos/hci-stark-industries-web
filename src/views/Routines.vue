<template>
  <v-container grid-list-md fluid>
    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Favourite Routines
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <BoxContainer :items="favouriteRoutines">
          <template v-slot:item="{ item }">
            <Routine :routine="item" v-on:reload-site="reload"></Routine>
          </template>
        </BoxContainer>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              All Routines
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            @click="newRoutineOpen"
            text
            outlined
            color="primary"

            v-blur
            >NEW ROUTINE</v-btn
          >
        </v-toolbar>
        <div >
        <BoxContainer :items="routines" >
          <template v-slot:item="{ item }">
            <Routine :routine="item" v-on:reload-site="reload"></Routine>
          </template>
        </BoxContainer>
        </div>
      </v-col>
    </v-row> </v-container
></template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Routine from "@/components/individuals/Routine";
import RoutineSchema from "../data/schemas/Routine";

export default {
  name: "Home",
  components: { BoxContainer, Routine },
  data() {
    return {
      routines: [],
      favouriteRoutines: [],
      dialogs: {
        routines: {
          new: false
        }
      }
    };
  },
  methods: {
    newRoutineOpen() {
      this.$router.push(this.$router.currentRoute.path + "/new");
    },

    openDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (!item[type]) item[type] = true;
    },
    closeDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (item[type]) item[type] = false;
    },
    async reload(){

        this.routines = await RoutineSchema.getAll();
        this.favouriteRoutines = this.routines.filter(el => {return el.isFavourite()})
    }
  },
  async mounted() {

    await this.reload();
  }
};
</script>

<style scoped></style>
