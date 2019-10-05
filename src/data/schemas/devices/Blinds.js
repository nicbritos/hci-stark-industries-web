import CommonDeviceSchema from "@/data/schemas/CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";
import DeviceIds from "./DeviceIds";

// Data extracted from API Docs
const ACTION_NAMES = {
  open: "open",
  close: "close"
};

export default class Blinds extends CommonDeviceSchema {
  static async create(name) {
    let data = await CommonDeviceSchema._create(name, DeviceIds.byType.Blinds);
    return new Blinds(data.id, data.name, data.meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, DeviceIds.byType.Blinds);

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

  async refreshState() {
    let state = await this._getState();
    this.status = state.status;
    if (this.status === "closed") this.isOpen = false;
    this.level = Number.parseInt(state.level);
  }
}
