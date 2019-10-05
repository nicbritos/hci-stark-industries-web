import DeviceInstantiator from "./devices/DeviceInstantiator";
import apiWrapper from "@/data/apiWrapper";
import CommonSchema from "CommonSchema";

// Data extracted from API Docs
export default class Room extends CommonSchema {
  static async create(name, region) {
    let meta = {
      region: region
    };

    let result = await CommonSchema._create(name, meta, null, "rooms", "room");

    return new Room(result.id, name, meta);
  }

  constructor(id, name, meta) {
    super(id, name, meta, "rooms", "room");
  }

  async setRegion(region) {
    if (typeof region !== "string" || (region = region.trim()).length === 0)
      throw new Error("No region provided");
    if (this.meta.region === region) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.region = region;
    let result = await apiWrapper.rooms.update(this.id, {
      name: name,
      typeId: this.deviceId,
      id: this.id,
      meta: CommonSchema._formatMeta(metaCopy)
    });

    // eslint-disable-next-line require-atomic-updates
    if (result.result) this.meta.region = region;
    return !!result.result;
  }

  async changeName(newName) {
    return this._changeName(newName);
  }

  async getDevices() {
    let result = await apiWrapper.rooms.getDevices(this.id);

    let devices = [];
    for (let device of result.devices) {
      devices.push(DeviceInstantiator.instantiate(device));
    }
    return devices;
  }
}
