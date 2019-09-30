<template>
  <v-dialog v-model="CurtainsMenu" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Curtain</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">Curtains</span>
        <v-btn icon absolute right>
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container> </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="CurtainsMenu = false">Cancel</v-btn>
          <v-btn color="blue" @click="CurtainsMenu = false">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FridgeMenu"
};
</script>

<style scoped></style>
