<template>
  <NewEditRegion
    :region="region"
    :regions="regions"
    :show="show"
    type="Edit"
    @closeClick="onClose"
  ></NewEditRegion>
</template>

<script>
import NewEditRegion from "./NewEditRegion";
import Region from "../../../data/schemas/Region";

export default {
  name: "EditRegion",
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
    },
    region: {
      type: Region,
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
