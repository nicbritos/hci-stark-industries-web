<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row align="center" justify="start">
          <v-col cols="1">
            <v-btn large icon color="primary"  v-blur @click="onClose">
              <v-icon large>arrow_back</v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <div>
              <span class="headline"
                >Are you sure you want to delete
                <span class="red--text">'{{ name }}'</span>?</span
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" v-blur @click="onClose">
        CANCEL
      </v-btn>
      <v-btn text color="error" v-blur @click="onDelete">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ErrorDialog",
  events: ["closeClick"],
  props: {
    name: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit("closeClick", false);
    },
    onDelete() {
      this.$emit("closeClick", true);
    }
  }
};
</script>

<style scoped></style>
