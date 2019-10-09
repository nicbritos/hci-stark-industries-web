<template>
  <NewEditRoom
    :regions="regions"
    :show="show"
    type="New"
    @closeClick="onClose"
  ></NewEditRoom>
</template>

<script>
import NewEditRoom from "./NewEditRoom";

export default {
  name: "NewRoom",
  components: { NewEditRoom },
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
