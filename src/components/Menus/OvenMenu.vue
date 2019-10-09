<template>
  <v-dialog v-model="OvenMenu" persistent max-width="400px">
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
            <v-radio label="default" value="conventional"></v-radio>
            <v-radio label="low" value="bottom"></v-radio>
            <v-radio label="high" value="top"></v-radio>
          </v-radio-group>
        </v-row>
        <span>Grill Mode</span>
        <v-row justify="space-around" align="center">
          <v-slider
            v-model="grill"
            :tick-labels="labelsGrill"
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
            :tick-labels="labelsConvection"
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
          <v-btn color="blue" @click="SaveAndExit()">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Oven from "../../data/schemas/devices/Oven";
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
  data: () => ({
      enabled: false,
      temperature: 100,
      heat_source: "conventional",
      grill: 0,
      convection: 0,
      labelsConvection: ["normal","eco","off"],
      labelsGrill: ["large","eco","off"],
      OvenMenu: false
    }),
  methods:{
    Delete(){
        var APIOven= new Oven(this.deviceId,this.name);


        APIOven.delete();

        this.Exit();
      },
    async LoadModel(){
            let APIOven = new Oven(this.deviceId, this.name);
            await APIOven.refreshState();


            this.enabled = APIOven.isOn;
            this.temperature = APIOven.temperature;
            this.heat_source = APIOven.heatMode;
            this.grill = labelsGrill.indexOf(APIOven.grillMode);
            this.convection = labelsConvection.indexOf(APIOven.convectionMode);
        },
      async SaveAndExit(){
        var APIOven = new Oven(this.deviceId, this.name);
        await APIOven.refreshState();
        if( APIOven.isOn() ){
          if( this.enabled ) {
            APIOven.setTemperature(this.temperature);
            APIOven.setConvection(this.labelsConvection[this.convection]);
            APIOven.setGrill(this.labelsGrill[this.grill]);
            APIOven.setHeat(this.heat_source);
          }
          else {
            APIOven.turnOff();
          }
        }
        else {
          if(this.enabled) {
            APIOven.turnOn();
            APIOven.setTemperature(this.temperature);
            APIOven.setConvection(this.labelsConvection[this.convection]);
            APIOven.setGrill(this.labelsGrill[this.grill]);
            APIOven.setHeat(this.heat_source);
          }
        }

        this.Exit();
        },
    Exit(){
      console.log("Sending Close Event from Oven")
      this.$emit('CloseMenu')
    }

  },
  watch:{
     openMenu:function (val) {
          this.OvenMenu= val;
          if(val){

              this.LoadModel();
          }
      },
  }
}
</script>

<style scoped></style>
