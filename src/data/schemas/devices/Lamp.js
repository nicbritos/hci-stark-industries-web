import CommonDeviceSchema from "CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";

// Data extracted from API Docs
const ACTION_NAMES = {
  on: "turnOn",
  off: "turnOff",
  setColor: "setColor",
  getState: "getState",
  setBrightness: "setBrightness"
};

const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 100;

const MIN_COLOR = 0x0;
const MAX_COLOR = 0xff;

const DEVICE_ID = "go46xmbqeomjrsjr";

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function formatColor(colors) {
  let ret = "";
  ret += Number(colors.red).toString(16);
  ret += Number(colors.green).toString(16);
  ret += Number(colors.blue).toString(16);
  return ret;
}

export default class Lamp extends CommonDeviceSchema {
  static async create(name, supportsColors) {
    let data = await CommonDeviceSchema.create(name, DEVICE_ID, {
      supportsColors: !!supportsColors
    });
    return new Lamp(data.id, data.name, data.meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, DEVICE_ID);

    this.isOn = false;
    this.brightness = 100;
    this.colors = {
      red: 0xff,
      blue: 0xff,
      green: 0xff
    };
  }

  async turnOn() {
    if (this.isOn) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.on
    );

    if (result.result) this.isOn = true;
    return result.result;
  }

  async turnOff() {
    if (!this.isOn) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.off
    );

    if (result.result) this.isOn = false;
    return result.result;
  }

  async setColor(red, green, blue) {
    if (!this.meta.supportsColors) return false;

    if (
      typeof red != "number" ||
      typeof green != "number" ||
      typeof blue != "number"
    )
      throw new Error("Invalid arguments. Colors should be of type numeric");

    red = adjustNumberRange(red, MIN_COLOR, MAX_COLOR);
    green = adjustNumberRange(green, MIN_COLOR, MAX_COLOR);
    blue = adjustNumberRange(blue, MIN_COLOR, MAX_COLOR);

    if (
      this.colors.red === red &&
      this.colors.green === green &&
      this.colors.blue === blue
    )
      return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.setBrightness,
      {
        color: formatColor({
          red: red,
          green: green,
          blue: blue
        })
      }
    );

    if (result.result) {
      this.colors.red = red;
      this.colors.blue = blue;
      this.colors.green = green;
    }
    return result.result;
  }

  async setBrightness(value) {
    if (typeof value != "number")
      throw new Error("Invalid argument. Brightness should be of type numeric");

    value = adjustNumberRange(value, MIN_BRIGHTNESS, MAX_BRIGHTNESS);

    if (this.brightness === value) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.setColor,
      {
        brightness: value
      }
    );

    if (result.result) this.brightness = value;
    return result.result;
  }

  async refreshState() {
    let state = await this._getState();
    this.isOn = state.status === "on";
    this.brightness = Number.parseInt(state.brightness);

    this.colors.red = Number.parseInt(state.color.substring(0, 2));
    this.colors.green = Number.parseInt(state.color.substring(2, 4));
    this.colors.blue = Number.parseInt(state.color.substring(4, 6));
  }
}
