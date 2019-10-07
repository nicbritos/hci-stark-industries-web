<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <slot name="item" v-bind:item="item"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BoxContainer",
  props: {
    items: {
      type: Array,
      required: true
    }
  },

};
</script>

<style scoped></style>
