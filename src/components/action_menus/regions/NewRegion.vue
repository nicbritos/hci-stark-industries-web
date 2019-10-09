<template>
  <NewEditRegion
    :regions="regions"
    :show="show"
    type="New"
    @closeClick="onClose"
  ></NewEditRegion>
</template>

<script>
import NewEditRegion from "./NewEditRegion";

export default {
  name: "NewRegion",
  components: { NewEditRegion },
  events: ["closeClick"],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    regions: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClose(data) {
      this.$emit("closeClick", data);
    }
  }
};
</script>

<style scoped></style>
