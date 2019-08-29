<template>
  <v-container grid-list-md>
    <!-- TABLE COMPONENT -->
    <v-container fluid>
      <v-row justify="start">
        <v-col cols="3">
          <v-row>
            <h1>Rooms</h1>
            <v-btn icon v-blur>
              <v-icon large>add_circle_outline</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-for="room in rooms" :key="room.name">
      <v-row justify="start">
        <v-col cols="3">
          <v-row>
            <h2>{{ room.name }}</h2>
            <v-btn icon v-blur>
              <v-icon large>add_circle_outline</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col cols="3" v-for="accessory in room.accessories" :key="accessory.name">
          <v-row >
            <v-btn v-blur min-height="100" min-width="100" text x-large>
              {{ accessory.name }}
              <!--              <img :src="`@/assets/${accessory.icon}`" alt="" />-->
              <!--              <img src="@/assets/light_bulb.png" alt="" />-->
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-divider></v-divider>
      </v-row>
    </v-container>
    <!--    <v-item-group>-->
    <!--      <v-row>-->
    <!--        <v-col-->
    <!--          v-for="(item, i) in rooms"-->
    <!--          :key="i"-->
    <!--          cols="12"-->
    <!--          md="6"-->
    <!--        >-->
    <!--          <v-item v-slot:default="props">-->
    <!--            <v-card-text>props.item.name</v-card-text>-->
    <!--          </v-item>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--    </v-item-group>-->

    <hr class="mb-5" />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    shown: true,
    snackbar: false,
    dialog: false,
    deleteDialog: false,
    deletingItem: {},
    editedIndex: -1,
    editedItem: {
      name: "",
      measurable: false,
      feedback: false
    },
    defaultItem: {
      name: "",
      measurable: false,
      feedback: false
    },
    selectedQuestions: [],
    expandedQuestions: []
  }),
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Question" : "Edit Question";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    deleteDialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = item;
      this.dialog = true;
    },

    deleteItem() {
      const index = this.questions.indexOf(this.deletingItem);

      this.questions.splice(index, 1);
      this.close();
    },

    setDialog(item) {
      this.deletingItem = item;
    },

    close() {
      this.dialog = false;
      this.deleteDialog = false;
      setTimeout(() => {
        this.editedItem = this.defaultItem;
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem);
      } else {
        this.questions.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
