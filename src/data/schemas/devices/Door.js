import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "../../apiWrapper";
import DeviceIds from "./DeviceIds";

// Data extracted from API Docs
const ACTION_NAMES = {
  open: "open",
  close: "close",
  lock: "lock",
  unlock: "unlock"
};

export default class Door extends CommonDeviceSchema {
  static async create(name, room) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Door, undefined, room);
    return new Door(data.id, data.name, data.meta, data.room);
  }

  constructor(id, name, meta, room) {
    super(id, name, meta, DeviceIds.byType.Door, room);

    this.isOpen = true;
    this.isLocked = true;
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

  async lock() {
    if (this.isLocked) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.lock
    );

    if (result.result) this.isLocked = true;
    return !!result.result;
  }

  async unlock() {
    if (!this.isLocked) return false;

    let result = await apiWrapper.devices.performAction(
      this.id,
      ACTION_NAMES.unlock
    );

    if (result.result) this.isLocked = false;
    return !!result.result;
  }

  async refreshState() {
    let state = await this._getState();

    this.status = state.status;
    if (this.status === "closed")
      this.isOpen = false;
    else
      this.isOpen = true;
    if (state.lock === "locked")
      this.isLocked = true;
    else
      this.isLocked = false;
  }
}
