<template>
    <v-card hover style="cursor: default" width="200" height="200">
        <v-card-text v-ripple style="cursor: pointer">
            <div>{{ device.room.name }}</div>
            <svg>{{}}</svg>
            <div class="text--secondary">
                {{ device.name }}
            </div>
        </v-card-text>
        <v-card-actions class="mt-n8 pb-0">
            <v-spacer></v-spacer>
            <v-btn icon v-blur text color="primary">
                <v-icon>favorite</v-icon>
            </v-btn>
            <v-switch class="mt-5 ml-4" v-model="device.on" v-blur color="primary">
            </v-switch>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Routine",props: {
            device: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>