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
    import apiWrapper from "../data/apiWrapper";
    import BoxContainer from "@/components/containers/BoxContainer";
    import Routine from "@/components/individuals/Routine";
    import DeviceContainer from "@/components/containers/DeviceContainer";
    import Devices from "../data/schemas/Devices";

    export default {
        name: "Search",
		data:()=>({
            searchQuery:"",
			deviceSearchResults:[],
			routinesSearchResults:[],
		}),
		components:{
            DeviceContainer,
            BoxContainer,
            Routine
		},
		methods:{
            containsString(src,str){
                return src.replace(/\s+/g, '').toLowerCase().includes(str.replace(/\s+/g, '').toLowerCase());
			},
            async LoadSearchResults(){
                let devices = await Devices.getAll();

                this.deviceSearchResults = devices.filter(el=>{return this.containsString(el.name,this.searchQuery)})

                let routines = await apiWrapper.routines.getAll();

                this.routinesSearchResults = routines
                    .filter(el=>{return this.containsString(el.name,this.searchQuery) ;})
            },
            reload(){
                this.LoadSearchResults();
			}
		},
		mounted() {
            this.searchQuery = this.$route.params.query;
            this.LoadSearchResults();
        }
    }
</script>

<style scoped>

</style>