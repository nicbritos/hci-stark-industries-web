<template>
  <v-dialog v-model="show" max-width="700px">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-row justify="start">
            <v-col cols="1">
              <v-btn
                large
                icon
                color="primary"
                v-on="on"
                v-blur
                @click="onClose"
              >
                <v-icon large>arrow_back</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <h1 class="mt-3" style="color: black">{{ type }} Region</h1>
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
  </v-dialog>
</template>

<script>
import DataValidator from "../../../data/DataValidator";
import Region from "../../../data/schemas/Region";

export default {
  name: "NewEditRegion",
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
    region: {
      type: Region,
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
      if (this.region != null) return this.region.name === this.newItem.name;
      return false;
    }
  },
  watch: {
    show: function(val, oldVal) {
      if (val) {
        this.newItem = Object.assign({}, this.defaultNewItem);
        if (this.region) this.newItem.name = this.region.name;
        this.exited = false;
      } else if (oldVal) {
        this.onClose();
      }
    }
  },
  methods: {
    validateNewNameAndSave() {
      return (this.errorMessages = this.validateNewName());
    },
    validateNewName() {
      let errorMessages = DataValidator.validateName(this.newItem.name, "Name");
      if (errorMessages.length === 0) {
        if (
          this.regions.filter(value => {
            return value !== this.region && value.name === this.newItem.name;
          }).length > 0
        ) {
          errorMessages.push("Name already exists");
        }
      }

      return errorMessages;
    },

    onSave() {
      if (!this.exited) {
        this.exited = true;
        this.$emit("closeClick", this.newItem);
      }
    },
    onClose() {
      if (!this.exited) {
        this.exited = true;
        this.$emit("closeClick", null);
      }
    }
  }
};
</script>

<style scoped></style>
