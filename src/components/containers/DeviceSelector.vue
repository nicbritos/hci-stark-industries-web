

<template>
	<v-container>

<!--		DONE-->
		<FridgeMenu v-if="device.type.id === 'rnizejqr2di0okho'"
					v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<SpeakerMenu v-else-if="device.type.id === 'c89b94e8581855bc'"
					 v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<CurtainsMenu v-else-if="device.type.id === 'eu0v2xgprrhhg41g'"
					  v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" mode="edit" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<LampMenu v-else-if="device.type.id === 'go46xmbqeomjrsjr'"
			  v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<OvenMenu v-else-if="device.type.id === 'im77xxyulpegfmv8'"
				  v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<ACMenu v-else-if="device.type.id === 'li6cbv5sdlatti0j'"
					  v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<DoorMenu v-else-if="device.type.id === 'lsf78ly0eqrjbz91'"
					  v-on:CloseMenu="ResendEvent()" :openMenu="superOpen" :name="device.name" :device-id="device.id"/>


	</v-container>
	
</template>


<script>
    import FridgeMenu from "../Menus/FridgeMenu";
    import DoorMenu from "../Menus/DoorMenu";
    import CurtainsMenu from "../Menus/CurtainsMenu";
    import SpeakerMenu from "../Menus/SpeakerMenu";
    import ACMenu from "../Menus/ACMenu";
    import LampMenu from "../Menus/LampMenu";
    import OvenMenu from "../Menus/OvenMenu";

    export default {
        name: "DeviceSelector",
        components: {OvenMenu,ACMenu,LampMenu,DoorMenu, SpeakerMenu, CurtainsMenu, FridgeMenu},
        props:{
            device:{
                type: Object,
                required: true
            },
            openMenu:{
                type: Boolean,
				required: true
			}
        },
		data:()=>({

			superOpen:false,
		}),

		methods:{
            ResendEvent(){
                console.log("Sending Close Event from Device Selector")
                this.superOpen = false;
                console.log("openMenu: "+ this.openMenu);
                this.$emit('CloseMenu')
            }

		},
		mounted() {
            console.log("Entre en DEVICE SELECTOR");
            console.log(this.device);
        },
		watch: {
            openMenu: function (val) {
                console.log("Changing variable in Device Selector");
                this.superOpen = val;
            }
        }
    }
</script>


<style scoped>

</style>