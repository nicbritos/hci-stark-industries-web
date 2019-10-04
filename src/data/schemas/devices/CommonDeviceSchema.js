import apiWrapper from "@/data/apiWrapper";

export default class CommonDeviceSchema {
  static deviceId() {
    throw new Error("This function needs to be overwritten");
  }

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

  constructor() {
    this.id = null;
  }

  delete() {
    apiWrapper._deleteDevice(this.id);
  }
}
