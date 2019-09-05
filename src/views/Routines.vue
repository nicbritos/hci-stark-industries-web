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

          <v-btn text outlined color="primary" v-on="on" v-blur>NEW ROUTINE</v-btn>
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
      favouriteRoutines: this.$store.state.routines.favourites
    };
  }
};
</script>

<style scoped></style>
