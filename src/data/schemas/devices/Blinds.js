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

    if (this.isOpen) return false;


    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.open
    );



    if (result.result) this.isOpen = true;
    return !!result.result;
  }

  async close() {


    if (!this.isOpen) return false;


    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.close
    );


    if (result.result) this.isOpen = false;
    return !!result.result;
  }

  isOpening() {
    return this.status === "opening";
  }

  async refreshState() {

    let state = await this._getState();



    this.status = state.status;
    if (this.status === "closed" || this.status === "closing")
      this.isOpen = false;
    else if (this.status === "opened" || this.status === "opening")
      this.isOpen = true;
    this.level = Number.parseInt(state.level);

  }
}
