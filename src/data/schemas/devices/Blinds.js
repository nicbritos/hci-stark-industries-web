import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "../../apiWrapper";
import DeviceIds from "./DeviceIds";

// Data extracted from API Docs
const ACTION_NAMES = {
  open: "open",
  close: "close"
};

export default class Blinds extends CommonDeviceSchema {
  static async create(name, room) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Blinds, undefined, room);
    return new Blinds(data.id, data.name, data.meta, data.room);
  }

  constructor(id, name, meta, room) {
    super(id, name, meta, DeviceIds.byType.Blinds, room);

    this.isOpen = false;
    this.level = 0;
    this.status = "closed";
  }

  async open() {
    console.log("is blind open: " + this.isOpen);
    if (this.isOpen) return false;

    console.log("Performing Action");
    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.open
    );

    console.log("Result: " + result.result);

    if (result.result) this.isOpen = true;
    return !!result.result;
  }

  async close() {
    console.log("is blind open: " + this.isOpen);

    if (!this.isOpen) return false;
    console.log("Performing Action");

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.close
    );
    console.log("Result: " + result.result);

    if (result.result) this.isOpen = false;
    return !!result.result;
  }

  async refreshState() {
    console.log("Entre a reflesh state");
    let state = await this._getState();
    console.log("Pase getState");
    console.log(`estado actual:`);
    console.log(state);
    this.status = state.status;
    if (this.status === "closed" || this.status === "closing")
      this.isOpen = false;
    else if (this.status === "opened" || this.status === "opening")
      this.isOpen = true;
    this.level = Number.parseInt(state.level);
    console.log("Sali de refreshstate");
  }
}
