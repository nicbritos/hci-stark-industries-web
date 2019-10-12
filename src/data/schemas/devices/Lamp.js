import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "../../apiWrapper";
import DeviceIds from "./DeviceIds";

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
  static async create(name, supportsColors, room) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Lamp, {
      supportsColors: !!supportsColors
    }, room);
    return new Lamp(data.id, data.name, data.meta, data.room);
  }

  constructor(id, name, meta, room) {
    super(id, name, meta, DeviceIds.byType.Lamp, room);

    this.isOn = false;
    this.brightness = 100;
    this.colors = {
      red: 0xff,
      blue: 0xff,
      green: 0xff
    };
    this.color = "FFFFFF";
  }

  async turnOn() {
    if (this.isOn) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.on
    );

    if (result.result) this.isOn = true;
    return !!result.result;
  }

  async turnOff() {
    if (!this.isOn) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.off
    );

    if (result.result) this.isOn = false;
    return !!result.result;
  }

  /* async setColor(red, green, blue) {
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

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setBrightness,
      [red,green,blue]
    );

    if (result.result) {
      this.colors.red = red;
      this.colors.blue = blue;
      this.colors.green = green;
    }
    return !!result.result;
  } */

  async setColor(new_color) {
    console.log(typeof new_color);
    if (typeof new_color != "string")
      throw new Error("Invalid argument. Color should be string");

    if (this.color === new_color) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setColor,
      [new_color]
    );

    if (result.result) this.color = new_color;
    return !!result.result;
  }

  async setBrightness(value) {
    if (typeof value != "number")
      throw new Error("Invalid argument. Brightness should be of type numeric");

    value = adjustNumberRange(value, MIN_BRIGHTNESS, MAX_BRIGHTNESS);

    if (this.brightness === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setBrightness,
        [value]
    );

    if (result.result) this.brightness = value;
    return !!result.result;
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
