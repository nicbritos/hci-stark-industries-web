import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";

// Data extracted from API Docs
const ACTION_NAMES = {
  open: "open",
  close: "close"
};

const DEVICE_ID = "eu0v2xgprrhhg41g";

export default class Blinds extends CommonDeviceSchema {
  static async create(name) {
    let data = await CommonDeviceSchema.create(name, this.deviceId());
    return new Blinds(data.id, data.name, data.meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, DEVICE_ID);

    this.isOpen = false;
  }

  async open() {
    if (this.isOpen) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.open
    );

    if (result.result) this.isOpen = true;
    return result.result;
  }

  async close() {
    if (!this.isOpen) return false;

    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.close
    );

    if (result.result) this.isOpen = false;
    return result.result;
  }
}
