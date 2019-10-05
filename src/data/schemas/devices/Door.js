import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";

// Data extracted from API Docs
const ACTION_NAMES = {
  open: "open",
  close: "close",
  lock: "lock",
  unlock: "unlock"
};

const DEVICE_ID = "lsf78ly0eqrjbz91";

export default class Door extends CommonDeviceSchema {
  static async create(name) {
    let data = await CommonDeviceSchema.create(name, DEVICE_ID);
    return new Door(data.id, data.name, data.meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, DEVICE_ID);

    this.isOpen = true;
    this.isLocked = true;
    this.status = "closed";
  }

  async open() {
    if (this.isOpen) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.open
    );

    if (result.result) this.isOpen = true;
    return !!result.result;
  }

  async close() {
    if (!this.isOpen) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.close
    );

    if (result.result) this.isOpen = false;
    return !!result.result;
  }

  async lock() {
    if (this.isLocked) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.lock
    );

    if (result.result) this.isLocked = true;
    return !!result.result;
  }

  async unlock() {
    if (!this.isLocked) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.unlock
    );

    if (result.result) this.isLocked = false;
    return !!result.result;
  }

  async refreshState() {
    let state = await this._getState();
    this.status = state.status;
    if (this.status === "closed") this.isOpen = false;
    if (state.lock === "locked") this.isLocked = true;
  }
}
