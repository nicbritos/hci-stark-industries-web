<template>
  <v-dialog v-model="FridgeMenu" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Fridge</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ Name }}</span>

        <v-btn icon absolute right @click="FridgeMenu = false">

          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
            <span> Freezer Temperature</span>
          <v-row justify="space-around" class="text-center" >
              <v-btn icon class="justify-center col-md-1" @click="FreezerTemperature=FreezerTemperature-1">
                <v-avatar color="blue">
                  <v-icon>remove</v-icon>
                </v-avatar>
              </v-btn>

              <v-avatar color="blue" size="80">
                  <span class="white--text headline">{{FreezerTemperature}}</span>
              </v-avatar>

              <v-btn icon class="justify-center col-md-1" @click="FreezerTemperature=1+FreezerTemperature">
                <v-avatar color="blue">
                  <v-icon>add</v-icon>
                </v-avatar>
              </v-btn>
          </v-row>
            <br/>

            <span> Fridge Temperature</span>
            <v-row justify="space-around" class="text-center" >
                <v-btn icon class="justify-center col-md-1" @click="FridgeTemperature=FridgeTemperature-1">
                    <v-avatar color="blue">
                        <v-icon>remove</v-icon>
                    </v-avatar>
                </v-btn>

                <v-avatar color="blue" size="80">
                    <span class="white--text headline">{{FridgeTemperature}}</span>
                </v-avatar>

                <v-btn icon class="justify-center col-md-1" @click="FridgeTemperature=1+FridgeTemperature">
                    <v-avatar color="blue">
                        <v-icon>add</v-icon>
                    </v-avatar>
                </v-btn>
            </v-row>

            <br/>
            <span> Fridge Mode</span>
            <v-row>
            <v-overflow-btn
              label="Mode"
              :items="dropdownFridgeMode"
              target="#dropdownFridgeMode"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="FridgeMenu = false">Cancel</v-btn>
          <v-btn color="blue" @click="FridgeMenu = false">Confirm</v-btn>

        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FridgeMenu",
  props: ["Name"],
  data() {
    return {
      dropdownFridgeMode: ["Normal", "Vacation", "Party"],
        FreezerTemperature:4,
        FridgeTemperature:18,
        FridgeMenu:false
    };
  }
};
</script>

<style scoped></style>
