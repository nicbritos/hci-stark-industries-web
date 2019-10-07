<template>
  <v-dialog v-model="SuperMenOpen" persistent max-width="400px">

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn icon absolute right @click="open = false">

          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
            <span> Freezer Temperature</span>
          <v-row  >
              <div class="buttonsContainer">
              <v-btn icon height="50" width="50" class="buttonLeft" @click="FridgeModel.freezerTemperature--">
                <v-avatar color="blue">
                  <v-icon>remove</v-icon>
                </v-avatar>
              </v-btn>

              <v-avatar color="blue" size="80">
                  <span class="white--text headline">{{FridgeModel.freezerTemperature}}</span>
              </v-avatar>

              <v-btn icon height="50" width="50" class="buttonRight" @click="FridgeModel.freezerTemperature++">
                <v-avatar color="blue">
                  <v-icon>add</v-icon>
                </v-avatar>
              </v-btn>
              </div>
          </v-row>


            <span > Fridge Temperature</span>
            <v-row  >
                <div class="buttonsContainer">

                <v-btn icon height="50" width="50" class="buttonLeft" @click="FridgeModel.temperature--">
                    <v-avatar color="blue">
                        <v-icon>remove</v-icon>
                    </v-avatar>
                </v-btn>

                <v-avatar color="blue" size="80">
                    <span class="white--text headline">{{FridgeModel.temperature}}</span>
                </v-avatar>

                <v-btn height="50" width="50" icon class="buttonRight" @click="FridgeModel.temperature++">
                    <v-avatar color="blue">
                        <v-icon>add</v-icon>
                    </v-avatar>
                </v-btn>
                </div>

            </v-row>

            <br/>
            <span> Fridge Mode</span>
            <v-row>
            <v-overflow-btn
              label="Mode"
              :items="dropdownFridgeMode"
              target="#dropdownFridgeMode"
              v-model="FridgeModel.mode"
            />
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
    import Fridge from "../../data/schemas/devices/Fridge";
export default {
  name: "fridgeMenu",
  props: {
      name:{
          type: String,
          required: true
      },
      deviceId:{
          type: String,
          required: true
      },
      openMenu:{
          type:Boolean,
          required: true
      }
  },
  data:()=> ({
      dropdownFridgeMode: ["default", "vacation", "aaaaa"],
      SuperMenOpen:false,
      FridgeModel:{
          temperature:8,
          freezerTemperature:0,
          mode:""},


  }),
    methods:{
        async LoadModel(){
            let APIFridge = new Fridge(this.deviceId,this.name);
            await APIFridge.refreshState();


            this.FridgeModel.freezerTemperature = APIFridge.freezerTemperature;
            this.FridgeModel.temperature = APIFridge.temperature;
            this.FridgeModel.mode = APIFridge.mode;
        },
        async SaveAndExit(){

            let APIFridge = new Fridge(this.deviceId,this.name);
            await APIFridge.refreshState();

            console.log(this.FridgeModel);

            console.log("Ento a SetFreezerTemp");
            APIFridge.setFreezerTemperature(this.FridgeModel.freezerTemperature);
            APIFridge.setMode(this.FridgeModel.mode);
            APIFridge.setTemperature(this.FridgeModel.temperature);

            this.Exit();

        },
        Exit(){
            console.log("Sending Close Event from Fridge")
            this.$emit('CloseMenu')
        }

    },
    mounted(){
        this.dropdownFridgeMode = Fridge.supportedModes();
    },
    
    watch:{

        openMenu:function (val) {
            this.SuperMenOpen= val;
          if(val){

              this.LoadModel();
          }
      },

    }
};
</script>

<style scoped>
    .buttonsContainer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .buttonLeft {
        left: 12%;
        top: -10px;
    }
    .buttonRight {
        right: 12%;
        top: -10px;
    }

</style>
