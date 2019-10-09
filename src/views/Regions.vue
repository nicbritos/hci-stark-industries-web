<template>
  <v-container grid-list-md fluid>
    <v-dialog v-model="dialogs.regions.new" max-width="700px">
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
                  @click="newRegionClose"
                >
                  <v-icon large>arrow_back</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <h1 class="mt-3" style="color: black">
                  New Region
                </h1>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col cols="1"> </v-col>
              <v-col>
                <v-text-field
                  :error-messages="newItem.errorMessages"
                  @input="validateNewNameAndSave"
                  @blur="validateNewNameAndSave"
                  :counter="newItem.nameMaxLength"
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
          <v-btn
            color="blue darken-1"
            text
            outlined
            @click="closeDialog(dialogs.regions, 'new')"
            v-blur
            >Cancel</v-btn
          >
          <v-btn
            outlined
            color="blue darken-1"
            text
            @click="newRegionClose"
            :disabled="!isValidNewName"
            v-blur
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col>
        <v-toolbar flat color="transparent">
          <v-toolbar-title>
            <h2>
              Regions
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            text
            outlined
            color="primary"
            class="ml-3 mb-2"
            v-on="on"
            v-blur
            @click="newRegionOpen"
            >NEW REGION</v-btn
          >
        </v-toolbar>
        <v-container fluid>
          <v-expansion-panels popout>
            <Region
              v-for="item of regions"
              :key="item.id"
              :region="item"
            ></Region>
          </v-expansion-panels>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiWrapper from "../data/apiWrapper";
import Region from "@/components/individuals/Region";
import DataValidator from "../data/DataValidator";

export default {
  name: "Regions",
  components: { Region },
  data() {
    return {
      on: false,
      regions: [],
      dialogs: {
        regions: {
          new: false,
          edit: false,
          delete: false
        }
      },
      newItem: {},
      defaultNewItem: {
        name: "",
        errorMessages: [],
        nameMaxLength: DataValidator.MAX_NAME_LENGTH
      }
    };
  },
  computed: {
    isValidNewName() {
      return this.validateNewName().length === 0;
    }
  },
  methods: {
    newRegionOpen() {
      this.newItem = Object.assign({}, this.defaultNewItem);
      this.openDialog(this.dialogs.regions, "new");
    },
    async newRegionClose() {
      this.$store.state.loading = true;

      let data = {
        name: this.newItem.name
      };
      this.regions.push(await apiWrapper.regions.create(data));

      this.$store.state.loading = false;
      this.closeDialog(this.dialogs.regions, "new");
    },

    openDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (!item[type]) item[type] = true;
    },
    closeDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (item[type]) item[type] = false;
    },

    validateNewNameAndSave() {
      return (this.newItem.errorMessages = this.validateNewName());
    },
    validateNewName() {
      let errorMessages = DataValidator.validateName(this.newItem.name, "Name");
      if (errorMessages.length === 0) {
        if (
          this.regions.filter(value => {
            return value.name === this.newItem.name;
          }).length > 0
        ) {
          errorMessages.push("Name already exists");
        }
      }

      return errorMessages;
    }
  },
  async mounted() {
    this.regions = await apiWrapper.regions.getAll();
  }
};
</script>

<style scoped></style>
