<template>
  <v-row>
    <v-dialog v-model="AlarmMenu" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Alarm</v-btn>
      </template>

      <v-card dark raised>
        <v-card-title>
          <span class="headline">{{Name}}</span>
          <v-btn icon absolute right @click="AlarmMenu = false">
            <v-avatar color="red">
              <v-icon>delete</v-icon>
            </v-avatar>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-row left>
                <span>Mode</span>
              </v-row>
            <v-row class="justify-center">
                <v-radio-group v-model="AlarmState" row>
                    <v-radio label="Deactivated" value="1" />
                    <v-radio label="Home Mode" value="2"/>
                    <v-radio label="Full Mode" value="3"/>
                </v-radio-group>
            </v-row>
              <hr>
              <br/>
            <v-row class="justify-center">
              <v-btn color="blue" rounded @click="changePass = !changePass">
                  <div v-if="MenuMode === 'create'">
                        Set Up Password
                  </div>
                  <div v-else-if="MenuMode === 'edit'">
                      Change Password
                  </div>
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div class="text-center">
            <v-btn color="red" @click="AlarmMenu = false">Cancel</v-btn>
            <v-btn color="blue" @click="AlarmMenu = false">Confirm</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="changePass" dark max-width="400px">
      <v-card>
        <v-card-title>
            <span v-if="MenuMode === 'create'">
                Set Up Password
            </span>
            <span v-else-if="MenuMode === 'edit'">
                Change Password
            </span>
        </v-card-title>
        <v-card-text class="justify-center">
          <v-row>
            <v-text-field
              label="New Password"
              outlined
              hint="The password must be a 4 digit numerical value"
              v-mask="mask"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Confirm Password"
              outlined
              v-mask="mask"
            ></v-text-field>
          </v-row>
          <v-row> </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="red" @click="changePass = false">Cancel</v-btn>
          <v-btn color="blue" @click="changePass = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  name: "AlarmMenu",
  directives: {
    mask
  },
  data () {
      return{
          AlarmState:'1',
          AlarmMenu: false,
          changePass: false,
          notifications: false,
          sound: true,
          widgets: false,
          mask: "####",
      }
  },
    props:[
        'MenuMode',
        // Puede tener valor create o edit
        'Name'
        // Nombre de la Alarma
    ],


  method: {
    ChangePassword() {
      alert("Yay");
    }
  }
};
</script>

<style scoped></style>
