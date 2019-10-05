<template>
  <v-dialog v-model="SpeakerMenu" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Speaker</v-btn>
    </template>

    <v-card dark raised>
      <v-card-title>
        <span class="headline">{{ name }}</span>

        <v-btn icon absolute right @click="SpeakerMenu = false">
          <v-avatar color="red">
            <v-icon>delete</v-icon>
          </v-avatar>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <span v-show="isSongLoaded">
              Playing <b>{{ CurrentSong.Name }}</b> by <b>{{ CurrentSong.Artist }}</b>
            </span>
            <span v-show="!isSongLoaded">
              No song
            </span>
          </v-row>
          <v-row>
            <div class="progressContainer">
              <span class="firstTimeMark">

                {{Math.floor(CurrentSong.TimeMark/60)}}:{{this.CurrentSong.TimeMark%60}}
              </span>

              <v-progress-linear
                top
                class=""
                color="light-blue"
                rounded
                :value="100 *(this.CurrentSong.Duration / this.CurrentSong.TimeMark)"
                buffer-value="100"
              />
              <span class="lastTimeMark">
                {{Math.floor(this.CurrentSong.Duration/60)}}:{{this.CurrentSong.Duration%60}}
              </span>
            </div>
          </v-row>
          <v-row>
            <div class="buttonsContainer ">
              <v-btn icon height="50" width="50" class="prevButton" @click="previusSong()">
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
                @click="CurrentSong.PlayState = !CurrentSong.PlayState"
              >
                <v-avatar size="80" color="blue">
                  <v-icon size="50" v-show="!CurrentSong.PlayState">
                    play_arrow
                  </v-icon>
                  <v-icon size="50" v-show="CurrentSong.PlayState">
                    pause
                  </v-icon>
                </v-avatar>
              </v-btn>

              <v-btn icon height="50" width="50" class="nextButton" @click="nextSong()">
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
                            v-model="Volume"
                            color="blue"
                            track-color="white"
                            always-dirty
                            min="0"
                            max="10"
                    >
                        <template v-slot:prepend>
                            <v-icon
                                    color="blue"
                                    @click="decrementVolume()"
                            >
                                remove
                            </v-icon>
                        </template>

                        <template v-slot:append>
                            <v-icon
                                    color="blue"
                                    @click="incrementVolume()"
                            >
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
                      item-text="Genre"
                      label="Genres"
                      item-value="id"
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
          <v-btn color="red" @click="SpeakerMenu = false">Cancel</v-btn>
          <v-btn color="blue" @click="SpeakerMenu = false">Confirm</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SpeakerMenu",
  props: ["name"],
  data: () => ({
    SpeakerMenu: false,
      SelectedDDL:0,
      CurrentSong: {
          Name: "",
          Artist: "",
          TimeMark: 0,
          Duration: 0,
          PlayState: true,

      },
      isSongLoaded: true,

    SongProgress: 50,
      Volume: 5,
      CurrentSongID:3,
      CurrentGenre:0,
      GenresList:[
          {id:0,Genre:"Rock", Songs:[
                  {Name:"Rock song 1",Artist:"Rock band 1",Duration:200},
                  {Name:"Rock song 2",Artist:"Rock band 1",Duration:100},
                  {Name:"Rock song 3",Artist:"Rock band 2",Duration:300},
                  {Name:"Rock song 4",Artist:"Rock band 2",Duration:250}
              ]},
          {id:1,Genre:"Pop", Songs:[
                  {Name:"Pop Song 1",Artist:"Pop band 1",Duration:200},
                  {Name:"Pop Song 2",Artist:"Pop band 1",Duration:200},
                  {Name:"Pop Song 3",Artist:"Pop band 2",Duration:200},
                  {Name:"Pop Song 4",Artist:"Pop band 2",Duration:200}
              ]},
          {id:2,Genre:"Soul", Songs:[
                  {Name:"Soul song 1",Artist:"Soul band 1",Duration:200},
                  {Name:"Soul song 2",Artist:"Soul band 1",Duration:200},
                  {Name:"Soul song 3",Artist:"Soul band 2",Duration:200},
                  {Name:"Soul song 4",Artist:"Soul band 2",Duration:200}
              ]},
          {id:3,Genre:"Alternative", Songs:[
                  {Name:"Alternative song 1",Artist:"Altenative band 1",Duration:200},
                  {Name:"Alternative song 2",Artist:"Altenative band 1",Duration:200},
                  {Name:"Alternative song 3",Artist:"Altenative band 2",Duration:200},
                  {Name:"Alternative song 4",Artist:"Altenative band 2",Duration:200}
              ]},

      ]

  }),
    methods:{
        stopMusic() {

            this.CurrentSongID=undefined;
            this.CurrentSong.PlayState = false;
            this.CurrentSong.Duration=0;
            this.CurrentSong.TimeMark=0;
            this.CurrentSong.Name="";
            this.CurrentSong.Artist="";

            this.isSongLoaded=false;

        },
        LoadGenre(){

            this.CurrentGenre = this.SelectedDDL;
            this.CurrentSongID=0;
            this.LoadSong();
            this.isSongLoaded=true;


        },
      LoadSong(){
          var song = this.GenresList[this.CurrentGenre].Songs[this.CurrentSongID];
          this.CurrentSong.Artist = song.Artist;
          this.CurrentSong.Name = song.Name;
          this.CurrentSong.PlayState= true;
          this.CurrentSong.Duration = song.Duration
          this.CurrentSong.TimeMark=0;
          this.SongProgress=0
      },
        previusSong(){
          if(this.CurrentSongID >0){
              this.CurrentSongID--;
          }
          this.LoadSong();
      },
        nextSong(){
          if(this.CurrentSongID < this.GenresList[this.CurrentGenre].Songs.length){
              this.CurrentSongID++;
          }
            this.LoadSong();

      },
        incrementVolume(){
            this.Volume++;

        },
        decrementVolume(){
            this.Volume--;
        },
        setUp(){
            this.Volume= 5;
            this.CurrentSongID=2
            this.CurrentGenre=0;

            this.LoadSong();
        }
    },
    mounted() {
        this.setUp();
    }

};
</script>

<style scoped>

    .genresContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .ddl{
        width: 90%;
    }
    .volumeContainer{
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
