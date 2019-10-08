<template>
  <v-dialog v-model="SuperMenuOpen" persistent max-width="400px">

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>
        <v-btn icon absolute right @click="Delete()">
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
          <v-row left>
            <span>Intensity</span>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
              <v-slider
                v-model="intensity"
                prepend-icon="lightbulb"
                append-icon="lightbulb"
              ></v-slider>
            </v-col>
          </v-row>
          <hr />
          <br />
          <v-row left>
            <span>Color</span>
          </v-row>
          <v-row class="justify-center">
            <v-color-picker
              light
              v-model="color"
              mode="hex"
              hide-inputs
            ></v-color-picker>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn color="red" @click="Exit()">Cancel</v-btn>
          <v-btn color="blue" @click="SaveAndExit()">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Lamp from "../../data/schemas/devices/Lamp";
export default {
  name: "LampMenu",
  props: {
    name:{
      type: String,
      required: true
    },
    deviceId:{
      type:String,
      required:true
    },
    openMenu:{
      type: Boolean,
      required:true
    }

  },
  data: () => ({
    color: {
      r: 255,
      g: 255,
      b: 255
    },
    enabled: false,
    intensity: 0,
    SuperMenuOpen: false
  }),
  methods:{
    Delete(){
        console.log("Entrando a DELETE");
        var APILamp = new Lamp(this.deviceId,this.name);


        APILamp.delete();

        this.Exit();
      },
    async LoadModel(){
            let APILamp = new Lamp(this.deviceId, this.name);
            await APILamp.refreshState();


            this.color = APILamp.color;
            this.enabled = APILamp.isOn;
            this.intensity = APILamp.brightness;
        },
      async SaveAndExit(){
        var APILamp = new Lamp(this.deviceId, this.name);
        await APILamp.refreshState();
        if (APILamp.isOn()) {
          if (this.enabled) {
            APILamp.setColor(this.color.r, this.color.g, this.color.b);
            APILamp.setBrightness(this.intensity);
          } else {
            APILamp.turnOff();
          }
        } else {
          if (this.enabled) {
           APILamp.turnOn();
           APILamp.setColor(this.color.r, this.color.g, this.color.b);
           APILamp.setBrightness(this.intensity);
          }
      }

      this.Exit();
        },
    Exit(){
      console.log("Sending Close Event from Lamp")
      this.$emit('CloseMenu')
    }

  },
  watch:{
     openMenu:function (val) {
          this.SuperMenuOpen= val;
          if(val){

              this.LoadModel();
          }
      },
  }
};
</script>

<style scoped></style>
