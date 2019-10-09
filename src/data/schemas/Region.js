import apiWrapper from "@/data/apiWrapper";
import CommonSchema from "./CommonSchema";

// Data extracted from API Docs
export default class Region extends CommonSchema {
  static async getAll() {
    let response = await apiWrapper.regions.getAll();
    let output = [];
    for (let region of response.result) {
      output.push(new Region(region.id, region.name, response.result.meta));
    }

    return output;
  }

  static async create(name) {
    let meta = {};

    let result = await CommonSchema._create(
      name,
      meta,
      null,
      "regions",
      "result"
    );

    return new Region(result.id, name, meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, "regions", "result");

    this.rooms = [];
  }

  // async getRooms() {
  //   return [];
  // }

  // async setRegion(region) {
  //   if (typeof region !== "string" || (region = region.trim()).length === 0)
  //     throw new Error("No region provided");
  //   if (this.meta.region === region) return false;
  //
  //   let metaCopy = Object.assign({}, this.meta);
  //   metaCopy.region = region;
  //   let result = await apiWrapper.rooms.update(this.id, {
  //     name: name,
  //     typeId: this.deviceId,
  //     id: this.id,
  //     meta: CommonSchema._formatMeta(metaCopy)
  //   });
  //
  //   // eslint-disable-next-line require-atomic-updates
  //   if (result.result) this.meta.region = region;
  //   return !!result.result;
  // }
  //
  async changeName(newName) {
    return this._changeName(newName);
  }
  //
  // async getDevices() {
  //   let result = await apiWrapper.rooms.getDevices(this.id);
  //
  //   let devices = [];
  //   for (let device of result.devices) {
  //     device.roomId = this.id;
  //     devices.push(DeviceInstantiator.instantiate(device));
  //   }
  //   return devices;
  // }
}
