<template>
  <NewEditRoom
    :regions="regions"
    :room="room"
    :show="show"
    type="Edit"
    @closeClick="onClose"
  ></NewEditRoom>
</template>

<script>
import NewEditRoom from "./NewEditRoom";
import Room from "../../../data/schemas/Room";

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
    },
    room: {
      type: Room,
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
