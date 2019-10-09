import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";
import DeviceIds from "./DeviceIds";

// Data extracted from API Docs
const ACTION_NAMES = {
  turnOn: "turnOn",
  turnOff: "turnOff",
  setTemperature: "setTemperature",
  setHeat: "setHeat",
  setGrill: "setGrill",
  setConvection: "setConvection"
};

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export default class Oven extends CommonDeviceSchema {
  static minTemperature() {
    return 90;
  }

  static maxTemperature() {
    return 230;
  }

  static supportedHeatModes() {
    return ["conventional", "bottom", "top"];
  }

  static supportedGrillModes() {
    return ["large", "eco", "off"];
  }

  static supportedConvectionModes() {
    return ["normal", "eco", "off"];
  }

  static async create(name) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Oven);
    return new Oven(data.id, data.name, data.meta, data.roomId);
  }

  constructor(id, name, meta, roomId) {
    super(id, name, meta, DeviceIds.byType.Oven, roomId);
    this.temperature = Oven.maxTemperature();
    this.isOn = false;
    this.heatMode = Oven.supportedHeatModes()[0];
    this.grillMode = Oven.supportedGrillModes()[0];
    this.convectionMode = Oven.supportedConvectionModes()[0];
  }

  async setTemperature(value) {
    if (typeof value != "number")
      throw new Error(
        "Invalid argument. Temperature should be of type numeric"
      );

    value = adjustNumberRange(
      value,
      Oven.minTemperature(),
      Oven.maxTemperature()
    );

    if (this.temperature === value) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setTemperature,
      [value]
    );

    if (result.result) this.temperature = value;

    return !!result.result;
  }

  async setGrill(state) {
    if (!Oven.supportedGrillModes().includes(state))
      throw new Error("Invalid Argument. State is not supported");

    if (state === this.grillMode) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setGrill,
      [state]
    );

    if (result.result) this.grillMode = state;

    return !!result.result;
  }

  async setHeat(state) {
    if (!Oven.supportedHeatModes().includes(state))
      throw new Error("Invalid Argument. State is not supported");

    if (state === this.heatMode) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setHeat,
      [state]
    );

    if (result.result) this.heatMode = state;

    return !!result.result;
  }

  async setConvection(state) {
    if (!Oven.supportedConvectionModes().includes(state))
      throw new Error("Invalid Argument. State is not supported");

    if (state === this.convectionMode) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.setConvection,
      [state]
    );

    if (result.result) this.convectionMode = state;

    return !!result.result;
  }

  async turnOn() {
    if (this.isOn) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.turnOn
    );

    if (result.result) this.isOn = true;

    return !!result.result;
  }

  async turnOff() {
    if (!this.isOn) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.turnOff
    );

    if (result.result) this.isOn = false;

    return !!result.result;
  }

  async refreshState() {
    let state = await this._getState();
    this.temperature = Number.parseInt(state.temperature);
    this.convectionMode = state.convection;
    this.heatMode = state.heat;
    this.grillMode = state.grill;
    this.isOn = !!state.status;
  }
}
