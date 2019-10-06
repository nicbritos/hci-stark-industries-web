<template>
  <v-dialog v-model="OvenMenu" persistent max-width="400px">
    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>
        <v-btn icon absolute right @click="Exit()">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
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
        <span>Heat Source</span>
        <v-row justify="space-around" align="center">
          <v-radio-group v-model="heat_source" row>
            <v-radio label="default" value="default"></v-radio>
            <v-radio label="low" value="low"></v-radio>
            <v-radio label="high" value="high"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Grill Mode</span>
        <v-row justify="space-around" align="center">
          <v-slider
            v-model="grill"
            :tick-labels="labels"
            :max="2"
            step="1"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </v-row>
        <span>Convection Mode</span>
        <v-row justify="space-around" align="center">
          <v-slider
            v-model="convection"
            :tick-labels="labels"
            :max="2"
            step="1"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="Exit()">Cancel</v-btn>
          <v-btn color="blue" @click="Exit()">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OvenMenu",
  props: {
    name: {
      type: String,
      required: true
    },
    deviceId: {
      type: String,
      required: true
    },
    openMenu: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      enabled: false,
      temperature: 100,
      heat_source: "default",
      grill: 0,
      convection: 0,
      labels: ["off", "saving", "on"],
      OvenMenu: false
    };
  },
  methods:{

    Exit(){
      console.log("Sending Close Event from Oven")
      this.$emit('CloseMenu')
    }

  },
  watch:{
    openMenu:function (val) {
      console.log("SADASDA")
      this.OvenMenu= val;
    }
  }
}
</script>

<style scoped></style>
