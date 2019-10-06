<template>
  <v-dialog v-model="SuperMenuOpen" persistent max-width="400px">

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
            <v-color-picker light v-model="color" hide-inputs></v-color-picker>
          </v-row>
        </v-container>
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
  data() {
    return {
      color: "",
      enabled: false,
      intensity: 0,
      SuperMenuOpen:false
    };
  },
  methods:{

    Exit(){
      console.log("Sending Close Event from Lamp")
      this.$emit('CloseMenu')
    }

  },
  watch:{
    openMenu:function (val) {
      console.log("SADASDA")
      this.SuperMenuOpen= val;
    }
  }
};
</script>

<style scoped></style>
