<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row justify="start">
          <v-col cols="1">
            <v-btn large icon color="primary"  v-blur @click="onClose">
              <v-icon large>arrow_back</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <h1 class="mt-3" style="color: black">{{ type }} Room</h1>
          </v-col>
        </v-row>

        <v-row justify="start">
          <v-col cols="1"> </v-col>
          <v-col>
            <v-text-field
              :error-messages="errorMessages"
              @input="validateNewNameAndSave"
              @blur="validateNewNameAndSave"
              :counter="nameMaxLength"
              v-model="newItem.name"
              label="Name"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text outlined @click="onClose" v-blur
        >Cancel</v-btn
      >
      <v-btn
        outlined
        color="blue darken-1"
        text
        @click="onSave"
        :disabled="disableSaveButton"
        v-blur
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import DataValidator from "../../../data/DataValidator";
import Room from "../../../data/schemas/Room";

export default {
  name: "NewEditRoom",
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
    type: {
      type: String,
      required: true
    },
    room: {
      type: Room,
      required: false
    }
  },
  data() {
    return {
      exited: false,
      newItem: {},
      errorMessages: [],
      nameMaxLength: DataValidator.MAX_NAME_LENGTH,
      defaultNewItem: {
        name: ""
      }
    };
  },
  computed: {
    disableSaveButton() {
      if (this.validateNewName().length !== 0) return true;
      if (this.room != null) return this.room.name === this.newItem.name;
      return false;
    }
  },
  watch: {
    show: function(val) {
      if (val) {
        this.resetData();
      }
    }
  },
  mounted() {
    this.resetData();
  },
  methods: {
    resetData() {
      this.newItem = Object.assign({}, this.defaultNewItem);
      if (this.room) {

        this.newItem.name = this.room.name;
      }
    },

    validateNewNameAndSave() {
      return (this.errorMessages = this.validateNewName());
    },
    validateNewName() {
      let errorMessages = DataValidator.validateName(this.newItem.name, "Name");
      if (errorMessages.length === 0) {
        let found = false;
        for (let region of this.regions) {
          for (let room of region.rooms) {
            if (room !== this.room && room.name === this.newItem.name) {
              found = true;
              break;
            }
          }
        }
        if (found) {
          errorMessages.push("Name already exists");
        }
      }

      return errorMessages;
    },

    onSave() {
      this.$emit("closeClick", this.newItem);
    },
    onClose() {
      this.$emit("closeClick", null);
    }
  }
};
</script>

<style scoped></style>
