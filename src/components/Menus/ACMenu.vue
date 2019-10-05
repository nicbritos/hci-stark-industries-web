<template>
  <v-dialog v-model="ACMenu" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open AC</v-btn>
    </template>
    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ Name }}</span>
        <v-btn icon absolute right @click="ACMenu = false">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-switch v-model="enabled"></v-switch>
          </v-row>
          <span>Temperature</span>
          <v-row justify="space-around" class="text-center">
            <v-btn
              icon
              class="justify-center col-md-1"
              @click="temperature = temperature - 1"
            >
              <v-avatar color="blue">
                <v-icon>remove</v-icon>
              </v-avatar>
            </v-btn>

            <v-avatar color="blue" size="80">
              <span class="white--text headline">{{ temperature }}</span>
            </v-avatar>

            <v-btn
              icon
              class="justify-center col-md-1"
              @click="temperature = 1 + temperature"
            >
              <v-avatar color="blue">
                <v-icon>add</v-icon>
              </v-avatar>
            </v-btn>
          </v-row>
          <span>Mode</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="mode" row>
              <v-radio label="airing" value="airing"></v-radio>
              <v-radio label="cold" value="cold"></v-radio>
              <v-radio label="hot" value="hot"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Vertical Blades</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="vertical_blades" row>
              <v-radio label="automatic" value="automatic"></v-radio>
              <v-radio label="22°" value="22"></v-radio>
              <v-radio label="45°" value="45"></v-radio>
              <v-radio label="67°" value="67"></v-radio>
              <v-radio label="90°" value="90"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Horizontal Blades</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="horizontal_blades" row>
              <v-radio label="automatic" value="automatic"></v-radio>
              <v-radio label="-90°" value="-90"></v-radio>
              <v-radio label="-45°" value="-45"></v-radio>
              <v-radio label="0°" value="0"></v-radio>
              <v-radio label="45°" value="45"></v-radio>
              <v-radio label="90°" value="90"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Speed</span>
          <v-row justify="space-around" align="center">
            <v-slider
              v-model="speed"
              :tick-labels="percentages"
              :max="4"
              step="1"
              ticks="always"
              tick-size="3"
            ></v-slider>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="ACMenu = false">Cancel</v-btn>
          <v-btn color="blue" @click="ACMenu = false">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ACMenu",
  props: ["Name"],
  data() {
    return {
      enabled: false,
      temperature: 18,
      mode: "",
      vertical_blades: "",
      horizontal_blades: "",
      percentages: ["default", "25", "50", "75", "100"],
      speed: 0,
      ACMenu: false
    };
  }
};
</script>

<style scoped></style>
