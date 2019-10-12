<template>
  <v-card dark raised>
    <v-dialog v-model="deleteDialog" max-width="700">
      <DeleteDialog
              :name="device.name"
              :show="deleteDialog"
              @closeClick="Delete"
      ></DeleteDialog>
    </v-dialog>
    <v-card-title>
      <span class="headline">{{ name }}</span>

      <v-btn icon absolute right @click="openDeleteDialog">
        <v-avatar color="red">
          <v-icon>delete</v-icon>
        </v-avatar>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <span v-show="SpeakerModel.isSongLoaded">
            Playing <b>{{ SpeakerModel.currentSong.name }}</b> by
            <b>{{ SpeakerModel.currentSong.artist }}</b>
          </span>
          <span v-show="!SpeakerModel.isSongLoaded">
            No song
          </span>
        </v-row>
        <v-row>
          <div class="progressContainer">
            <span class="firstTimeMark">
              {{ Math.floor(SpeakerModel.currentSong.timemark / 60) }}:{{
                this.SpeakerModel.currentSong.timemark % 60
              }}
            </span>

            <v-progress-linear
              top
              class=""
              color="light-blue"
              rounded
              :value="SpeakerModel.currentSong.progress"
              buffer-value="100"
            />
            <span class="lastTimeMark">
              {{ Math.floor(this.SpeakerModel.currentSong.duration / 60) }}:{{
                this.SpeakerModel.currentSong.duration % 60
              }}
            </span>
          </div>
        </v-row>
        <v-row>
          <div class="buttonsContainer ">
            <v-btn
              icon
              height="50"
              width="50"
              class="prevButton"
              @click="previusSong()"
            >
              <v-avatar size="50" color="blue">
                <v-icon>
                  fast_rewind
                </v-icon>
              </v-avatar>
            </v-btn>

            <v-btn
              width="80"
              height="80"
              icon
              @click="playPauseButtonPressed()"
            >
              <v-avatar size="80" color="blue">
                <v-icon
                  size="50"
                  v-show="!this.SpeakerModel.currentSong.isPlaying"
                >
                  play_arrow
                </v-icon>
                <v-icon
                  size="50"
                  v-show="this.SpeakerModel.currentSong.isPlaying"
                >
                  pause
                </v-icon>
              </v-avatar>
            </v-btn>

            <v-btn
              icon
              height="50"
              width="50"
              class="nextButton"
              @click="nextSong()"
            >
              <v-avatar size="50" color="blue">
                <v-icon>
                  fast_forward
                </v-icon>
              </v-avatar>
            </v-btn>
          </div>
          <v-btn icon class="stopButton" @click="stopMusic()">
            <v-avatar color="blue">
              <v-icon>
                stop
              </v-icon>
            </v-avatar>
          </v-btn>
        </v-row>
        <v-row>
          <v-slider
            class="volumeContainer"
            v-model="SelectedVolume"
            color="blue"
            track-color="white"
            always-dirty
            min="0"
            max="10"
          >
            <template v-slot:prepend>
              <v-icon color="blue" @click="decrementVolume()">
                remove
              </v-icon>
            </template>

            <template v-slot:append>
              <v-icon color="blue" @click="incrementVolume()">
                add
              </v-icon>
            </template>
          </v-slider>
        </v-row>
        <v-row>
          <div class="genresContainer">
            <v-overflow-btn
              class=" ddl"
              :items="GenresList"
              v-model="SelectedDDL"
            >
            </v-overflow-btn>

            <v-avatar color="blue" @click="LoadGenre()">
              <v-icon>
                play_arrow
              </v-icon>
            </v-avatar>
          </div>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="justify-center">
      <div class="text-center">
        <v-btn color="red" @click="Exit()">Cancel</v-btn>
        <v-btn color="blue" @click="SaveAndExit()">SAVE</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import Speakers from "../../data/schemas/devices/Speakers";
import DeleteDialog from "../info_dialogs/DeleteDialog";

export default {
  name: "SpeakerMenu",
  components: { DeleteDialog },
  props: {
    device: {
      type: Speakers,
      required: true
    },/* 
    deviceId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    mode:{
      type: String,
      required: true
    }, */
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    interval: undefined,
    deleteDialog: false,

    SpeakerModel: {
      genre: "",
      isSongLoaded: false,
      currentSong: {
        name: "",
        artist: "",
        album: "",
        duration: 0,
        timemark: 0,
        isPlaying: false,
        progress: 0
      },
      volume: 5,
      playlist: []
    },

    GenresList: [],
    SelectedDDL: 0,
    SelectedVolume: 5,

    PreviousModel: undefined
  }),
  methods: {
    },
      Exit(){
          console.log("Sending Close Event from Speaker")
          this.$emit('CloseMenu', {
            name: this.name,
            id: this.deviceId,
            state: this.SpeakerModel
          });
      },
    playPauseButtonPressed() {
      if (!this.SpeakerModel.isSongLoaded)
        return;

      this.SpeakerModel.currentSong.isPlaying = !this.SpeakerModel.currentSong.isPlaying;

      if (this.SpeakerModel.currentSong.isPlaying)
        this.resumeMusic();
      else
        this.pauseMusic();
    },
    async stopMusic() {
        if(this.mode === 'edit') {
          let APISpeaker = new Speakers(this.deviceId, this.name);
          await APISpeaker.stop();
          await APISpeaker.refreshState();
          this.LoadModel(APISpeaker);

          window.clearInterval(this.interval);
        }
    },
    async resumeMusic() {
      if(this.mode === 'edit') {

        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.resume();
        await APISpeaker.refreshState();
        this.LoadModel(APISpeaker);
        this.StartSongTimer();
      }
    },
    async pauseMusic() {
      if(this.mode === 'edit') {

        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.pause();
        await APISpeaker.refreshState();

        this.LoadModel(APISpeaker);

        window.clearInterval();
      }
    },
    async LoadGenre() {
      if(this.mode === 'edit') {
        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.selectGenre(this.SelectedDDL);
        await APISpeaker.play();
        await APISpeaker.refreshState();
        this.LoadModel(APISpeaker);
        this.StartSongTimer();
      }
    },
    async previusSong() {
      if(this.mode === 'edit') {

        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.previousSong();
        await APISpeaker.refreshState();
        this.LoadModel(APISpeaker);
      }
    },
    async nextSong() {
      if(this.mode === 'edit') {
        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.nextSong();
        await APISpeaker.refreshState();
        this.LoadModel(APISpeaker);
      }
    },
    incrementVolume() {
      if (this.SpeakerModel.volume < Speakers.maxVolume()) {
        this.SpeakerModel.volume++;
      }
    },
    async acknowledgeVolumenChange() {
      this.SpeakerModel.volume = this.SelectedVolume;

      if(this.mode === 'edit') {
        let APISpeaker = new Speakers(this.deviceId, this.name);
        await APISpeaker.setVolume(this.SpeakerModel.volume);
      }
    },
    decrementVolume() {
      if (this.SpeakerModel.volume > Speakers.minVolume()) {
        this.SpeakerModel.volume--;
      }
    },
    async setUp() {
      let APISpeaker = new Speakers(this.deviceId, this.name);
      await APISpeaker.refreshState();

      this.PreviousModel = APISpeaker;
      this.LoadModel(APISpeaker);
    },
    ConvertSongModel(APISong) {
      var song = {
        name: APISong.title,
        artist: APISong.artist,
        duration: 0,
        timemark: 0,
        album: APISong.Album,
        isPlaying: false,
        progress: 0
      };

      song.duration =
        Number.parseInt(APISong.duration.match("^(\\d+):.*$")[1]) * 60 +
        Number.parseInt(APISong.duration.match("^.*:(\\d+)$")[1]);

      song.timemark =
        Number.parseInt(APISong.progress.match("^(\\d+):.*$")[1]) * 60 +
        Number.parseInt(APISong.progress.match("^.*:(\\d+)$")[1]);

      song.progress =
        100 *
        (this.SpeakerModel.currentSong.timemark /
          this.SpeakerModel.currentSong.duration);

      return song;
    },
    LoadModel(model) {

      this.SpeakerModel.genre = model.genre;

      this.SelectedDDL = model.genre;

      this.SpeakerModel.volume = model.volume;
      this.SelectedVolume = model.volume;

      switch (model.status) {
        case "playing":
          this.SpeakerModel.isSongLoaded = true;
          this.SpeakerModel.currentSong = this.ConvertSongModel(model.song);
          this.SpeakerModel.currentSong.isPlaying = true;

          break;
        case "paused":
          this.SpeakerModel.isSongLoaded = true;
          this.SpeakerModel.currentSong = this.ConvertSongModel(model.song);
          this.SpeakerModel.currentSong.isPlaying = false;
          break;
        case "stopped":
          this.SpeakerModel.isSongLoaded = false;
          this.SpeakerModel.currentSong = {
            isPlaying: false,
            timemark: 0,
            duration: 0,
            progress: 0
          };
          break;
      }
    },
    StartSongTimer() {
      window.clearInterval(this.interval);
      this.interval = window.setInterval(() => {
        if (this.SpeakerModel.isSongLoaded) {
          if (this.SpeakerModel.currentSong.isPlaying) {
            this.SpeakerModel.currentSong.timemark++;
            console.log("aumento el timer");

            this.SpeakerModel.currentSong.progress =
              100 *
              (this.SpeakerModel.currentSong.timemark /
                this.SpeakerModel.currentSong.duration);

            if (
              this.SpeakerModel.currentSong.timemark >=
              this.SpeakerModel.currentSong.duration
            ) {
              console.log("NOOOOOOOOO");
              this.nextSong();
            }
          }
        }
      }, 1000);
    },

    openDeleteDialog() {
      this.deleteDialog = true;
    },
    async Delete(value) {
      if (value) {
        try {
          await this.device.room.deleteDevice(this.device);
        } catch (e) {
          await this.device.delete();
        }
        this.deleteDialog = false;
        this.onDelete();
      } else {
        this.deleteDialog = false;
      }
    },
  },
  watch: {
    SelectedVolume: function(val) {
      if (val === this.SpeakerModel.volume) return;
      console.log("Detecting new volume: " + val);
      this.acknowledgeVolumenChange();
    },
    show: function(val) {
      if (val) {
        this.GenresList = Speakers.supportedGenres();
        this.setUp();
        this.StartSongTimer();
      } else {
        window.clearInterval(this.interval);
      }
    }
  }
};
</script>

<style scoped>
.genresContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ddl {
  width: 90%;
}
.volumeContainer {
  width: 100%;
  padding-top: 30px;
}
.progressContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}
.firstTimeMark {
  left: 3%;
  padding-right: 10px;
  width: 13%;
}
.lastTimeMark {
  right: 3%;
  padding-left: 10px;
  width: 13%;
}
.progressBar {
  width: auto;
  align-self: center;
}
.buttonsContainer {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  width: 90%;
  padding-top: 30px;
  padding-left: 10%;
}

.prevButton {
  left: 12%;
  top: -10px;
}
.nextButton {
  right: 12%;
  top: -10px;
}
.stopButton {
  margin-top: 50px;
}
</style>
