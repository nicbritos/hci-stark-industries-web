<template>
  <v-container grid-list-md fluid>
    <v-snackbar :value="true">
      Deleted Region "Third Floor"
      <v-btn text color="primary">
        UNDO
      </v-btn>
      <v-btn icon text color="primary">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
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
              <v-col cols="1">
              </v-col>
              <v-col>
              <v-text-field
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
            v-blur
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--    <v-dialog v-model="dialogs.regions.edit" max-width="700px">-->
    <!--      <v-card>-->
    <!--        <v-card-text>-->
    <!--          <v-container fluid>-->
    <!--            <v-row>-->
    <!--              <v-col>-->
    <!--                <h1 style="color: black">Edit Question</h1>-->
    <!--              </v-col>-->
    <!--            </v-row>-->

    <!--            <v-row>-->
    <!--              <v-col>-->
    <!--                <v-text-field-->
    <!--                        v-model="editedItemCopy.name"-->
    <!--                        label="Name"-->
    <!--                        clearable-->
    <!--                ></v-text-field>-->
    <!--              </v-col>-->
    <!--            </v-row>-->
    <!--            <v-row>-->
    <!--              <v-col>-->
    <!--                <v-tooltip bottom :open-on-hover="editedItemCopy.answered">-->
    <!--                  <template v-slot:activator="{ on }">-->
    <!--                    <div v-on="on">-->
    <!--                      <v-checkbox-->
    <!--                              v-model="editedItemCopy.measurable"-->
    <!--                              label="Measurable"-->
    <!--                              color="primary"-->
    <!--                              :disabled="editedItemCopy.answered"-->
    <!--                      ></v-checkbox>-->
    <!--                    </div>-->
    <!--                  </template>-->
    <!--                  <span-->
    <!--                  >Cannot change Question type if it has already been-->
    <!--                    answered</span-->
    <!--                  >-->
    <!--                </v-tooltip>-->
    <!--              </v-col>-->

    <!--              <v-col>-->
    <!--                <v-checkbox-->
    <!--                        v-model="editedItemCopy.feedback"-->
    <!--                        label="Feedback"-->
    <!--                        color="primary"-->
    <!--                ></v-checkbox>-->
    <!--              </v-col>-->

    <!--              <v-col>-->
    <!--                <v-checkbox-->
    <!--                        v-model="editedItemCopy.answered"-->
    <!--                        label="Answered"-->
    <!--                        :disabled="true"-->
    <!--                        color="primary"-->
    <!--                ></v-checkbox>-->
    <!--              </v-col>-->
    <!--            </v-row>-->
    <!--          </v-container>-->
    <!--        </v-card-text>-->

    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-btn-->
    <!--                  color="blue darken-1"-->
    <!--                  text-->
    <!--                  @click="closeDialog(dialogs.questions, 'edit')"-->
    <!--                  v-blur-->
    <!--          >Cancel</v-btn-->
    <!--          >-->
    <!--          <v-btn color="blue darken-1" text @click="editQuestionClose" v-blur-->
    <!--          >Save</v-btn-->
    <!--          >-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->

    <!--    <v-dialog v-model="dialogs.regions.delete" max-width="700px">-->
    <!--      <v-card>-->
    <!--        <v-card-text>-->
    <!--          <v-card-title>-->
    <!--            <span class="headline"-->
    <!--            >Are you sure you want to delete-->
    <!--              <span class="red&#45;&#45;text">{{ selectedItems.length }}</span>-->
    <!--              questions?</span-->
    <!--            >-->
    <!--          </v-card-title>-->
    <!--        </v-card-text>-->

    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-btn-->
    <!--                  text-->
    <!--                  color="primary"-->
    <!--                  v-blur-->
    <!--                  @click="closeDialog(dialogs.selected, 'delete')"-->
    <!--          >-->
    <!--            CANCEL-->
    <!--          </v-btn>-->
    <!--          <v-btn text color="error" v-blur @click="deleteSelectedClose">-->
    <!--            Delete-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->

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
    </v-row> </v-container
></template>

<script>
import Region from "@/components/individuals/Region";
export default {
  name: "Regions",
  components: { Region },
  data() {
    return {
      regions: this.$store.state.regions,
      dialogs: {
        regions: {
          new: false,
          edit: false,
          delete: false
        }
      },
      newItem: {
        name: ""
      }
    };
  },
  methods: {
    newRegionOpen() {
      this.newItem = Object.assign({}, this.defaultQuestion);
      this.openDialog(this.dialogs.regions, "new");
    },
    newRegionClose() {
      // Save to DB
      this.closeDialog(this.dialogs.regions, "delete");
    },

    openDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (!item[type]) item[type] = true;
    },
    closeDialog(item, type) {
      if (item == null || type == null || item[type] == null) return;
      if (item[type]) item[type] = false;
    }
  }
};
</script>

<style scoped></style>
