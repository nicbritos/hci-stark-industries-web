<template>
  <v-dialog v-model="FridgeMenu" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Fridge</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn icon absolute right @click="FridgeMenu = false">

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
              <v-btn icon height="50" width="50" class="buttonLeft" @click="Fridge.freezerTemperature--">
                <v-avatar color="blue">
                  <v-icon>remove</v-icon>
                </v-avatar>
              </v-btn>

              <v-avatar color="blue" size="80">
                  <span class="white--text headline">{{Fridge.freezerTemperature}}</span>
              </v-avatar>

              <v-btn icon height="50" width="50" class="buttonRight" @click="Fridge.freezerTemperature++">
                <v-avatar color="blue">
                  <v-icon>add</v-icon>
                </v-avatar>
              </v-btn>
              </div>
          </v-row>


            <span > Fridge Temperature</span>
            <v-row  >
                <div class="buttonsContainer">

                <v-btn icon height="50" width="50" class="buttonLeft" @click="Fridge.temperature--">
                    <v-avatar color="blue">
                        <v-icon>remove</v-icon>
                    </v-avatar>
                </v-btn>

                <v-avatar color="blue" size="80">
                    <span class="white--text headline">{{Fridge.temperature}}</span>
                </v-avatar>

                <v-btn height="50" width="50" icon class="buttonRight" @click="Fridge.temperature++">
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
              v-model="Fridge.mode"
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
  name: "fridgeMenu",
  props: {
      name:{
          type: String,
          required: true
      },
      deviceId:{
          type: String,
          required: true
      }
  },
  data:()=> ({
      dropdownFridgeMode: ["default", "vacation", "party"],
      Fridge:{temperature:8,freezerTemperature:0,mode:""},

        FridgeMenu:false
      
  }),
    methods:{
        LoadModel(model){
            this.Fridge = model;
        },
      SetUpForEdit(){
          var myInit = {
              method: "PUT",
              headers: { "Content-Type": "application/json" }
          };
          fetch(`http://localhost:8080/api/devices/${this.deviceId}/getState`, myInit)
                  .then(response => {
                      console.log("Request recibido");
                      return response.json();
                  })
                  .then(data => this.LoadModel(data.result))
                  .catch(error => {
                      console.log(error);
                  });
      },
        SaveAndExit(){
            var myInit = {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            };
            fetch(`http://localhost:8080/api/devices/${this.deviceId}/getState`, myInit)
                    .then(response => {
                        console.log("Request recibido");
                        return response.json();
                    })
                    .then(data => this.LoadModel(data.result))
                    .catch(error => {
                        console.log(error);
                    });

        }
    },
    
    watch:{
      FridgeMenu:function (val) {
          if(val){
              this.SetUpForEdit();

          }
      }
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
