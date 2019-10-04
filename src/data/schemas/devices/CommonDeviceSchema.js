import apiWrapper from "@/data/apiWrapper";

// Data extracted from API Docs
const ACTION_NAMES = {
  getState: "getState"
};

export default class CommonDeviceSchema {
  static _formatMeta(meta) {
    return JSON.stringify(meta);
  }

  static async create(name, deviceId) {
    let meta = {
      favourite: false
    };

    let result = await apiWrapper._createDevice({
      typeId: deviceId,
      name: name,
      meta: this._formatMeta(meta)
    });

    return { id: result.device.id, name: name, meta: meta };
  }

  constructor(id, name, meta, deviceId) {
    this.id = id;
    this.name = name;
    this.meta = meta;
    this.deviceId = deviceId;
  }

  async setFavourite(value) {
    let nextValue = !!value;
    if (this.meta.favourite === nextValue) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.favourite = nextValue;
    let result = await apiWrapper._updateDevice(this.id, {
      name: name,
      typeId: this.deviceId,
      id: this.id,
      meta: CommonDeviceSchema._formatMeta(metaCopy)
    });

    // eslint-disable-next-line require-atomic-updates
    if (result.result) this.meta.favourite = nextValue;
    return result.result;
  }

  async getState() {
    let result = await apiWrapper._performActionOnDevice(
      this.id,
      ACTION_NAMES.getState
    );

    return result.result;
  }

  async delete() {
    return (await apiWrapper._deleteDevice(this.id)).result;
  }
}
