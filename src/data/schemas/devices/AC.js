import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";
import DeviceIds from "./DeviceIds";

// Data extracted from API Docs
const ACTION_NAMES = {
  on: "turnOn",
  off: "turnOff",
  setMode: "setMode",
  getState: "getState",
  setFanSpeed: "setFanSpeed",
  setTemperature: "setTemperature",
  setVerticalSwing: "setVerticalSwing",
  setHorizontalSwing: "setHorizontalSwing"
};

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export default class AC extends CommonDeviceSchema {
  static minTemperature() {
    return 18;
  }

  static maxTemperature() {
    return 38;
  }

  static supportedModes() {
    return ["cool", "heat", "fan"];
  }

  static supportedVerticalSwings() {
    return ["auto", "22", "45", "67", "90"];
  }

  static supportedHorizontalSwings() {
    return ["auto", "-90", "-45", "0", "45", "90"];
  }

  static supportedFanSpeeds() {
    return ["auto", "25", "50", "75", "100"];
  }

  static async create(name) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.AC);
    return new AC(data.id, data.name, data.meta, data.roomId);
  }

  constructor(id, name, meta, roomId) {
    super(id, name, meta, DeviceIds.byType.AC, roomId);

    this.isOn = false;
    this.mode = AC.supportedModes()[0];
    this.temperature = AC.minTemperature();
    this.fanSpeed = AC.supportedFanSpeeds()[0];
    this.swing = {
      vertical: AC.supportedVerticalSwings()[0],
      horizontal: AC.supportedHorizontalSwings()[0]
    };
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

  async setTemperature(value) {
    if (typeof value != "number")
      throw new Error("Invalid argument. Temperature should be of type numeric");

    value = adjustNumberRange(value, AC.minTemperature(), AC.maxTemperature());

    if (this.temperature === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setTemperature,
      [value]
    );

    if (result.result) this.temperature = value;
    return !!result.result;
  }

  async setMode(value) {
    if (!(value in AC.supportedModes())) return false;
    if (this.mode === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setMode,
      [value]
    );

    if (result.result) this.mode = value;
    return !!result.result;
  }

  async setVerticalSwing(value) {
    if (!(value in AC.supportedVerticalSwings())) return false;
    if (this.swing.vertical === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setVerticalSwing,
      [value]
    );

    if (result.result) this.swing.vertical = value;
    return !!result.result;
  }

  async setHorizontalSwing(value) {
    if (!(value in AC.supportedHorizontalSwings())) return false;
    if (this.swing.horizontal === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setHorizontalSwing,
        [value]

    );

    if (result.result) this.swing.horizontal = value;
    return !!result.result;
  }

  async setFanSpeed(value) {
    if (!(value in AC.supportedFanSpeeds())) return false;
    if (this.fanSpeed === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setFanSpeed,
        [value]

    );

    if (result.result) this.swing.horizontal = value;
    return !!result.result;
  }

  async refreshState() {
    let state = await this._getState();
    this.isOn = state.status === "on";
    this.temperature = Number.parseInt(state.temperature);
    this.mode = state.mode;
    this.swing.vertical = state.verticalSwing;
    this.swing.horizontal = state.horizontalSwing;
    this.fanSpeed = state.fanSpeed;
  }
}
