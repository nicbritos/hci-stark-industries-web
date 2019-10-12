

<template>
	<v-container>

<!--		DONE-->
		<FridgeMenu v-if="device.deviceId === 'rnizejqr2di0okho'"
					v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<SpeakerMenu v-else-if="device.deviceId === 'c89b94e8581855bc'"
					 v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<CurtainsMenu v-else-if="device.deviceId === 'eu0v2xgprrhhg41g'"
					  v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode"  :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<LampMenu v-else-if="device.deviceId === 'go46xmbqeomjrsjr'"
			  v-on:CloseMenu="ResendEvent" :openMenu="superOpen"  :mode="mode" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<OvenMenu v-else-if="device.deviceId === 'im77xxyulpegfmv8'"
				  v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<ACMenu v-else-if="device.deviceId === 'li6cbv5sdlatti0j'"
					  v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode" :name="device.name" :device-id="device.id"/>
<!--		DONE-->
		<DoorMenu v-else-if="device.deviceId === 'lsf78ly0eqrjbz91'"
					  v-on:CloseMenu="ResendEvent" :openMenu="superOpen" :mode="mode" :name="device.name" :device-id="device.id"/>

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
			},
			mode:{
                type: String,
				required: false,
				default: "edit"
			}
        },
		data:()=>({

			superOpen:false,
		}),

		methods:{
            ResendEvent(ev){
                console.log("Sending Close Event from Device Selector")
                this.superOpen = false;
                console.log(ev);
                ev.deviceId = this.device.deviceId;
                this.$emit('CloseMenu',ev)
            }

		},
		mounted() {
            //console.log(this.device);
        },
		watch: {
            openMenu: function (val) {
                console.log("opening Device Selector");
                this.superOpen = val;
                console.log("Selected device: " + this.device.name);
                console.log(this.device);
                console.log("STate: " + val);
            }
        }
    }
</script>


<style scoped>

</style>