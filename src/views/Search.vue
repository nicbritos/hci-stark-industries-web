<template>
	<div>
	<v-row>
		<v-col>
			<v-toolbar flat color="transparent">
				<v-toolbar-title>
					<h2>
						Search Results
					</h2>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-divider/>
	<v-expansion-panels  >
		<div class="expansionContainer">
			<v-expansion-panel >
				<v-expansion-panel-header>
					<h3>
						{{this.deviceSearchResults.length}} devices found
					</h3>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<DeviceContainer  :room="true" :items="deviceSearchResults" v-on:reload-site="reload" ></DeviceContainer>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel >
				<v-expansion-panel-header>
					<h3>
						{{this.routinesSearchResults.length}} routines found
					</h3>
				</v-expansion-panel-header>
				<v-expansion-panel-content>

					<BoxContainer :items="routinesSearchResults" >
						<template v-slot:item="{ item }">
							<Routine :routine="item" v-on:reload="reload"></Routine>
						</template>
					</BoxContainer>

				</v-expansion-panel-content>
			</v-expansion-panel>
		</div>
	</v-expansion-panels>
	</div>
</template>

<script>
    //import apiWrapper from "./data/apiWrapper";
    import BoxContainer from "@/components/containers/BoxContainer";
    import Routine from "@/components/individuals/Routine";
    import DeviceContainer from "@/components/containers/DeviceContainer";

    export default {
        name: "Search",
		data:()=>({
            searchQuery:"",
		}),
		components:{
            DeviceContainer,
            BoxContainer,
            Routine
		},
		methods:{
            LoadSearchResults(){
                this.unfilteredDevicesSearchResults = await apiWrapper.devices.getAll();

                this.deviceSearchResults = this.unfilteredDevicesSearchResults
                    .filter(el=>{return el.name.replace(/\s+/g, '').toLowerCase().includes(this.searchText.replace(/\s+/g, '').toLowerCase());})

                console.log(this.deviceSearchResults);
                console.log(`DEVICES FOUND: ${this.deviceSearchResults.length}`);

                this.unfilteredRoutineSearchResults = await apiWrapper.routines.getAll();

                console.log(this.unfilteredRoutineSearchResults);
                this.routinesSearchResults = this.unfilteredRoutineSearchResults
                    .filter(el=>{return el.name.replace(/\s+/g, '').toLowerCase().includes(this.searchText.replace(/\s+/g, '').toLowerCase());})

            }
		},
		mounted() {
            this.searchQuery = this.$route.params.query;
        }
    }
</script>

<style scoped>

</style>