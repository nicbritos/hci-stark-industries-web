<template>
  <v-dialog v-model="ACMenu" persistent max-width="600px">
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
              <v-radio label="cool" value="cool"></v-radio>
              <v-radio label="fan" value="fan"></v-radio>
              <v-radio label="heat" value="heat"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Vertical Blades</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="vertical_blades" row>
              <v-radio label="auto" value="auto"></v-radio>
              <v-radio label="22°" value="22"></v-radio>
              <v-radio label="45°" value="45"></v-radio>
              <v-radio label="67°" value="67"></v-radio>
              <v-radio label="90°" value="90"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Horizontal Blades</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="horizontal_blades" row>
              <v-radio label="auto" value="auto"></v-radio>
              <v-radio label="-90°" value="-90"></v-radio>
              <v-radio label="-45°" value="-45"></v-radio>
              <v-radio label="0°" value="0"></v-radio>
              <v-radio label="45°" value="45"></v-radio>
              <v-radio label="90°" value="90"></v-radio>
            </v-radio-group>
          </v-row>
          <span>Speed</span>
          <v-row justify="space-around" align="center">
            <v-radio-group v-model="Speed" row>
              <v-radio label="auto" value="auto"></v-radio>
              <v-radio label="25" value="25"></v-radio>
              <v-radio label="50" value="50"></v-radio>
              <v-radio label="75" value="75"></v-radio>
              <v-radio label="100" value="100"></v-radio>
            </v-radio-group>
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
export default {
  name: "ACMenu",
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
      temperature: 18,
      mode: "cool",
      vertical_blades: "auto",
      horizontal_blades: "auto",
      speed: "auto",
      ACMenu: false
    }),
  methods:{
    Delete(){
        var APIAC= new AC(this.deviceId,this.name);


        APIAC.delete();

        this.Exit();
      },
    async LoadModel(){
            let APIAC = new AC(this.deviceId, this.name);
            await APIAC.refreshState();


            this.enabled = APIAC.isOn;
            this.mode = APIAC.mode;
            this.temperature = APIAC.temperature;
            this.vertical_blades = APIAC.swing.vertical;
            this.horizontal_blades = APIAC.swing.horizontal;
            this.speed = APIAC.fanSpeed;
        },
      async SaveAndExit(){
        var APIAC = new AC(this.deviceId, this.name);
        await APIAC.refreshState();
        if (APIAC.isOn()) {
          if (this.enabled) {
            APIAC.setMode(this.mode);
            APIAC.setFanSpeed(this.speed);
            APIAC.setHorizontalSwing(this.horizontal_blades);
            APIAC.setVerticalSwing(this.vertical_blades);
            APIAC.setTemperature(this.temperature);
          } else {
            APIAC.turnOn();
          }
        } else {
          if (this.enabled) {
            APIAC.turnOn();
            APIAC.setMode(this.mode);
            APIAC.setFanSpeed(this.speed);
            APIAC.setHorizontalSwing(this.horizontal_blades);
            APIAC.setVerticalSwing(this.vertical_blades);
            APIAC.setTemperature(this.temperature);
          }
        }

        this.Exit();
      },
    Exit(){
      console.log("Sending Close Event from AC")
      this.$emit('CloseMenu')
    }

  },
  watch:{
     openMenu:function (val) {
          this.ACMenu= val;
          if(val){

              this.LoadModel();
          }
      },
  }
};
</script>

<style scoped></style>
