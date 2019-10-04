import CommonDeviceSchema from "./CommonDeviceSchema";
import apiWrapper from "@/data/apiWrapper";

// Data extracted from API Docs

const ACTION_NAMES = {
  open: "open",
  close: "close",
  getState: "getState"
};

export default class Blinds extends CommonDeviceSchema {
  static deviceId() {
    return "eu0v2xgprrhhg41g";
  }

  static async create(name) {
    let meta = {
      favourite: false
    };

    let result = await apiWrapper._createDevice({
      typeId: this.deviceId(),
      name: name,
      meta: this._formatMeta(meta)
    });

    return new Blinds(result.device.id, name, meta);
  }

  constructor(name, id, meta) {
    super();

    this.id = id;
    this.isOpen = false;
    this.name = name;
    this.meta = meta;
  }

  async setFavourite(value) {
    let nextValue = !!value;
    if (this.meta.favourite === nextValue) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.favourite = nextValue;
    let result = await apiWrapper._updateDevice(this.id, {
      name: this.name,
      typeId: Blinds.deviceId(),
      id: this.id,
      meta: Blinds._formatMeta(metaCopy)
    });

    if (result.result) this.meta.favourite = nextValue;
    return result.result;
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

  async getState() {
    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.getState
    );

    return result.result;
  }
}
