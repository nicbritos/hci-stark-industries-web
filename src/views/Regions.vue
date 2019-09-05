<template>
  <v-container grid-list-md fluid>
    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Regions
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="ml-3 mb-2" v-on="on" v-blur
            >NEW REGION</v-btn
          >
        </v-toolbar>
        <v-container fluid>
          <v-expansion-panels popout>
            <Region
              v-for="item of regions"
              :key="item.id"
              :region="item"
            ></Region>
          </v-expansion-panels>
        </v-container>
      </v-col>
    </v-row> </v-container
></template>

<script>
import Region from "@/components/individuals/Region";
export default {
  name: "Regions",
  components: { Region },
  data() {
    return {
      regions: this.$store.state.regions
    };
  }
};
</script>

<style scoped></style>
