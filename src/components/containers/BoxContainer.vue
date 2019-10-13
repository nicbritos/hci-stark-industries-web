<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="item in items" :key="item.id">
        <slot name="item" v-bind:item="item"         v-on:reload="propagateReload"></slot>
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
  methods:{
    propagateReload(){

      this.$emit('reload')
    }
  }

};
</script>

<style scoped></style>
