<template>
    <v-dialog v-model="CurtainsMenu" persistent max-width="400px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Curtain</v-btn>
        </template>


    <v-card dark raised>
        <v-card-title>
            <span class="headline">Curtains</span>


            <v-btn icon absolute right @click="CurtainsMenu = false">
                <v-avatar color="red">
                    <v-icon>delete</v-icon>

                </v-avatar>
            </v-btn>

        </v-card-title>
        <v-card-text>
            <v-container >
                <v-row justify="span">
                    <v-col>
                        <img id="image" src="../../assets/CurtainOpen.svg"/>
                    </v-col>
                    <v-col cols="4">
                        <v-row>
                            <v-btn width="50" height="60"  color="blue">
                                <v-img  src="../../assets/arrowUp.svg"/>
                            </v-btn>
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
                <v-btn color="red"  @click="CurtainsMenu = false">Cancel</v-btn>
                <v-btn color="blue"  @click="CurtainsMenu = false">Confirm</v-btn>
            </div>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CurtainsMenu",
        data: () => ({
            CurtainsMenu: false,
        }),
        methods:{

        }

    }



</script>

<style scoped>

</style>