<template>
  <v-dialog v-model="CurtainsMenu" persistent max-width="400px">
dsfsddsfas
    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn v-if="mode === 'edit'" icon absolute right @click="Delete()">
            <v-avatar  color="red">
                <v-icon>delete</v-icon>
            </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <img id="image" :src="ImageCurrent" />
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-btn
                  :disabled="this.ButtonUp.disabled"
                  width="50"
                  height="60"
                  color="blue"
                  @click="OpenCurtain()"
                >
                  <v-icon>
                    keyboard_arrow_up
                  </v-icon>
                </v-btn>
              </v-row>
              <v-row>
<!--                CANCER-->
                <br />
              </v-row>
              <v-row>
                <v-btn
                  :disabled="this.ButtonDown.disabled"
                  width="50"
                  height="60"
                  color="blue"
                  @click="CloseCurtain()"
                >
                  <v-icon>
                    keyboard_arrow_down
                  </v-icon>
                </v-btn>
              </v-row>
            </v-col>
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
  import ImageRetriever from "../../data/ImageRetriever";
  import Blinds from "../../data/schemas/devices/Blinds";
export default {
  name: "curtainsMenu",
  props: {
    deviceId: {
      type: String,
      required: false
    },
    mode: {
      type: String,
      required: true
    },
      name:{
        type: String,
        required: true
      },
    openMenu:{
      type:Boolean,
      required:true
    }
  },
  data: () => ({
    ButtonUp: {
      disabled: true,
      ImageToSet: ImageRetriever.GetImages("eu0v2xgprrhhg41g",ImageRetriever.ACTIONS.OPEN)
    },

    ButtonDown: {
      disabled: false,
      ImageToSet: ImageRetriever.GetImages("eu0v2xgprrhhg41g",ImageRetriever.ACTIONS.CLOSE)
    },

    CurtainsMenu: false,
    ImageCurrent: "",
  }),
  methods: {
      Delete(){
        console.log("Entrando a DELETE");
        var APIBlinds = new Blinds(this.deviceId,this.name);
        APIBlinds.delete();

        this.Exit();
      },
    async SaveAndExit() {

      this.Exit();

    },
      Exit(){
        console.log("Sending Close Event from Curtains");
        this.$emit('CloseMenu',
                {
                    name: this.name,
                    id: this.deviceId,
                    state: {
                        curtainUp: this.ButtonUp.disabled
                    }
                });
      },
    async OpenCurtain() {
      this.ButtonUp.disabled = true;
      this.ButtonDown.disabled = false;
      this.ImageCurrent = this.ButtonUp.ImageToSet;
        if(this.mode === 'edit') {
            var APIBlinds = new Blinds(this.deviceId, this.name);
            await APIBlinds.refreshState();
            await APIBlinds.open();
        }
    },
    async CloseCurtain() {
      this.ButtonUp.disabled = false;
      this.ButtonDown.disabled = true;
      this.ImageCurrent = this.ButtonDown.ImageToSet;
      if(this.mode === 'edit') {

          var APIBlinds = new Blinds(this.deviceId, this.name);
          await APIBlinds.refreshState();
          await APIBlinds.close();
      }

    },
    SetUp() {
      this.ImageCurrent = this.ButtonUp.ImageToSet;
    },
    async LoadModel() {

      let APIBlinds = new Blinds(this.deviceId,this.name);
      await APIBlinds.refreshState();
      console.log("Sali de refreshState");
      console.log(APIBlinds);
      if (APIBlinds.isOpen) {
        this.OpenCurtain();
      } else {
        this.CloseCurtain();
      }
    }

  },
  watch: {
    openMenu: function(val) {
      this.CurtainsMenu = val;
      console.log("ENTRANDO");
      if ( val) {
        console.log("entrando al modo editar");
        this.LoadModel();
      }
    }
  }
};
</script>

<style scoped></style>
