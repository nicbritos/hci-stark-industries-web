import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "../../apiWrapper";
import DeviceIds from "./DeviceIds";
import rebuildFunctionalSlots from "vuetify/lib/util/rebuildFunctionalSlots";

// Data extracted from API Docs
const ACTION_NAMES = {
  setVolume: "setVolume",
  play: "play",
  pause: "pause",
  stop: "stop",
  resume: "resume",
  nextSong: "nextSong",
  previousSong: "previousSong",
  setGenre: "setGenre",
  getPlaylist: "getPlaylist"
};

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export default class Speakers extends CommonDeviceSchema {
  static maxVolume() {
    return 10;
  }

  static minVolume() {
    return 0;
  }

  static supportedGenres() {
    return ["classical", "country", "dance", "latina", "pop", "rock"];
  }

  static supportedStatus() {
    return ["playing", "paused", "stopped"];
  }

  static async create(name, room) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Speakers, undefined, room);
    return new Speakers(data.id, data.name, data.meta, data.room);
  }

  constructor(id, name, meta, room) {
    super(id, name, meta, DeviceIds.byType.Speakers, room);

    this.volume = Speakers.maxVolume();
    this.genre = Speakers.supportedGenres()[0];
    this.status = "stop";
    this.song = undefined;
  }

  async setVolume(value) {
    if (typeof value != "number")
      throw new Error("Invalid argument. Volume should be of type numeric");

    value = adjustNumberRange(
      value,
      Speakers.minVolume(),
      Speakers.maxVolume()
    );

    if (this.volume === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setVolume,
      [value]
    );

    if (result.result) this.volume = value;

    return !!result.result;
  }

  async play() {
    if (this.status === "playing") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.play
    );

    if (result.result) this.status = "playing";

    return !!result.result;
  }

  async resume() {
    if (this.status === "playing" || this.status === "stopped") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.resume
    );

    if (result.result) this.status = "playing";

    return !!result.result;
  }

  async stop() {
    if (this.status == "stopped") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.stop
    );

    if (result.result) this.status = "stopped";

    return !!result.result;
  }

  async pause() {
    if (this.status == "paused") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.pause
    );

    if (result.result) this.status = "resume";

    return !!result.result;
  }

  async nextSong() {
    if (this.status === "stopped" || this.status === "paused") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.nextSong
    );

    return !!result.result;
  }

  async previousSong() {
    if (this.status === "stopped" || this.status === "paused") return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.previousSong
    );

    return !!result.result;
  }

  async selectGenre(genre) {
    if (!Speakers.supportedGenres().includes(genre))
      return new Error("Invalid Argument. Genre not supported");

    if (this.genre === genre) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setGenre,
      [genre]
    );

    if (result.result != undefined) this.genre = genre;

    return !!result.result;
  }

  async getPlaylist() {
    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.getPlaylist
    );

    return result.result;
  }

  async refreshState() {
    let state = await this._getState();
    this.status = state.status;
    this.volume = Number.parseInt(state.volume);
    this.genre = state.genre;
    this.song = state.song;
  }
}
