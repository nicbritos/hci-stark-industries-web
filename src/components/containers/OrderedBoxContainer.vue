<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto" v-for="(item, i) in items" :key="item.id">
        <v-row>
          <v-col align-self="center" v-if="i > 0 && i < items.length">
            DFSDFD
            <v-img
              src="/img/iconmonstr-arrow-right-thin.svg"
              width="50"
            ></v-img>
          </v-col>
          <v-col align-self="center">
            <v-avatar color="primary" size="36">
              <span class="white--text">{{ i + 1 }}</span>
            </v-avatar>
          </v-col>
          <v-col>
            <slot name="item" v-bind:item="item"></slot>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderedBoxContainer",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
