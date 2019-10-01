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
        <RoutineContainer :items="favouriteRoutines"></RoutineContainer>

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
        <RoutineContainer :items="routines"></RoutineContainer>
      </v-col>
    </v-row> </v-container
></template>

<script>
import RoutineContainer from "@/components/containers/RoutineContainer";

export default {
  name: "Home",
  components: { RoutineContainer },
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
