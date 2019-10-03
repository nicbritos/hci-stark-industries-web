<template>
    <v-dialog v-model="CurtainsMenu" persistent max-width="400px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Curtain</v-btn>
        </template>


    <v-card dark raised>
        <v-card-title>
            <span class="headline">{{name}}</span>


            <v-btn icon absolute right @click="CurtainsMenu = false">
                <v-avatar color="red">
                    <v-icon>delete</v-icon>

                </v-avatar>
            </v-btn>

        </v-card-title>
        <v-card-text>
            <v-container >
                <v-row justify="space-between">
                    <v-col>
                        <img id="image" :src="ImageCurrent"/>
                    </v-col>
                    <v-col cols="4">
                        <v-row>
                            <v-btn :disabled="this.ButtonUp.disabled" width="50" height="60"  color="blue" @click="OpenCurtain()">
                                <v-icon>
                                    keyboard_arrow_up
                                </v-icon>
                            </v-btn>
                        </v-row>
                        <v-row>
                            <br/>
                        </v-row>
                        <v-row>
                            <v-btn :disabled="this.ButtonDown.disabled" width="50" height="60" color="blue" @click="CloseCurtain()">
                                <v-icon>
                                    keyboard_arrow_down
                                </v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>

            </v-container>
        </v-card-text>
        <v-card-actions class="justify-center" >
            <div class="text-center">
                <v-btn color="red"  @click="CurtainsMenu = false">Cancel</v-btn>
                <v-btn color="blue"  @click="CurtainsMenu = false">Confirm</v-btn>
            </div>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "curtainsMenu",
        props:[
            'name'
        ],
        data: () => ({

            ButtonUp:{
                disabled:true,ImageToSet:"img/devices/CurtainOpen.svg"
            },

            ButtonDown:{
                disabled:false,ImageToSet:"img/devices/CurtainClosed.svg"
            },

            CurtainsMenu: false,
            ImageCurrent:"",
        }),
        methods:{
            OpenCurtain(){

                this.ButtonUp.disabled=true;
                this.ButtonDown.disabled=false;
                this.ImageCurrent= this.ButtonUp.ImageToSet;

            },
            CloseCurtain(){
                this.ButtonUp.disabled=false;
                this.ButtonDown.disabled=true;
                this.ImageCurrent= this.ButtonDown.ImageToSet;

            },
            SetUp(){
                this.ImageCurrent=this.ButtonUp.ImageToSet;
            }
        },
        mounted(){
            this.SetUp()
        },
    }



</script>

<style scoped>

</style>