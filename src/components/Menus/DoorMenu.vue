<template>
    <v-dialog v-model="DoorMenu" persistent max-width="400px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Door</v-btn>
        </template>


        <v-card dark raised>
            <v-card-title>
                <span class="headline">{{Name}}</span>


                <v-btn icon absolute right @click="DoorMenu = false">
                    <v-avatar color="red">
                        <v-icon>delete</v-icon>

                    </v-avatar>
                </v-btn>

            </v-card-title>
            <v-card-text>
                <v-container >
                    <v-row justify="span">
                        <v-col>
                            <img  :src="CurrentDoorImage"/>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <v-switch label="open Door"/>
                                <v-switch label="open Door"/>
                            </v-row>
                            <v-row>
                                <br/>
                            </v-row>
                            <v-row>
                                <v-btn width="50" height="60" color="blue">
                                    <v-img  style="rotation:180deg " src="../../assets/arrowDown.svg"/>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>

                </v-container>
            </v-card-text>
            <v-card-actions class="justify-center" >
                <div class="text-center">
                    <v-btn color="red"  @click="DoorMenu = false">Cancel</v-btn>
                    <v-btn color="blue"  @click="DoorMenu = false">Confirm</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DoorMenu",


    data:() => ({
        closedDoorImage: "../../assets/ClosedDoor.svg",
        openDoorImage: "../../assets/OpenDoor.svg",
        lockDoorImage: "../../assets/DoorLock.svg",
        unlockDoorImage: "../../assets/DoorUnlock.svg",
        CurrentDoorImage:"",

    })
    }
</script>

<style scoped>

</style>