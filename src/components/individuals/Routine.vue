<template>
  <v-card hover style="cursor: default" width="350">
    <v-card-text v-ripple style="cursor: pointer">
      <p class="display-1 text--primary">
        {{ routine.name }}
      </p>
      <div class="text--secondary">
        {{
          routine.description != null
            ? routine.description
            : "No description set"
        }}<br />
      </div>
    </v-card-text>
    <v-card-actions class="mt-n4">
      <v-spacer></v-spacer>
      <v-btn icon v-blur text color="primary">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon v-blur>
        <v-icon large color="primary">play_circle_outline</v-icon>
      </v-btn>
    </v-card-actions>
    <!--        <v-card-actions class="mt-n8 pb-0">-->
    <!--            <v-spacer></v-spacer>-->
    <!--            <v-btn icon v-blur text color="primary">-->
    <!--                <v-icon>favorite</v-icon>-->
    <!--            </v-btn>-->
    <!--            <v-switch class="mt-5 ml-4" v-model="routine.on" v-blur color="primary">-->
    <!--            </v-switch>-->
    <!--        </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  name: "Routine",
  props: {
    routine: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
