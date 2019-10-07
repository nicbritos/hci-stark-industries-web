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
            <Routine :routine="item"></Routine>
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
            v-on="on"
            v-blur
            >NEW ROUTINE</v-btn
          >
        </v-toolbar>
        <BoxContainer :items="routines">
          <template v-slot:item="{ item }">
            <Routine :routine="item"></Routine>
          </template>
        </BoxContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import BoxContainer from "@/components/containers/BoxContainer";
import Routine from "@/components/individuals/Routine";
import apiWrapper from "../data/apiWrapper";
export default {
  name: "Home",
  components: { BoxContainer, Routine },
  data() {
    return {
      routines: [],
      favouriteRoutines: [],
      on:false,
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
    }
  },
  async mounted() {
    let routines = await apiWrapper.routines.getAll();
    console.log(routines);
    this.routines = routines;
    console.log(this.routines);
    this.favouriteRoutines = routines.filter(el=>{return el.meta.favourited;});
    console.log(this.favouriteRoutines);
  }
};
</script>

<style scoped></style>
