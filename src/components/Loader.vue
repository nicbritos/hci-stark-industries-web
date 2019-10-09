<template>
  <v-dialog persistent v-model="loading" max-width="200">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="auto">
              <v-progress-circular
                :size="50"
                :width="4"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <div class="text-center subtitle-1 text--secondary">
                {{ text }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["loading"],
  data() {
    return {
      text: "",
      defaultText: "Loading",
      timeout: null,
      dots: 0
    };
  },
  watch: {
    loading: function(val) {
      if (val) {
        this.text = this.defaultText;
        this.resetInterval();
        setInterval(() => {
          if (this.dots === 3) {
            this.dots = 0;
            this.text = this.defaultText;
          } else {
            this.text += ".";
            this.dots++;
          }
        }, 750);
      } else if (this.timeout != null) {
        this.resetInterval();
      }
    }
  },
  methods: {
    resetInterval() {
      if (this.timeout != null) {
        clearInterval(this.timeout);
        this.timeout = null;
      }
    }
  }
};
</script>

<style lang="scss">
.full {
  min-height: 100vh;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99999;

  .overlay {
    background-color: #d32f2f;
    position: absolute;
    min-height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
  }

  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
