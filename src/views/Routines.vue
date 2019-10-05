<template>
  <v-container grid-list-md fluid>
    <!--    <v-dialog v-model="dialogs.routines.new" max-width="800px">-->
    <!--      <NewRoutine-->
    <!--        :value="dialogs.routines.new"-->
    <!--        @cancel="newRoutineClose"-->
    <!--      ></NewRoutine>-->
    <!--    </v-dialog>-->
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
        <BoxContainer :items="favouriteRoutines">
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

export default {
  name: "Home",
  components: { BoxContainer, Routine },
  data() {
    return {
      routines: this.$store.state.routines.items,
      favouriteRoutines: this.$store.state.routines.favourites,
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
  }
};
</script>

<style scoped></style>
