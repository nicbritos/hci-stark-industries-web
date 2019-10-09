import DeviceInstantiator from "./devices/DeviceInstantiator";
import apiWrapper from "../apiWrapper";
import CommonSchema from "./CommonSchema";
import Region from "./Region";

// Data extracted from API Docs
export default class Room extends CommonSchema {
  static async get(roomId) {
    let response = await apiWrapper.rooms.get(roomId);
    let parentRegion = new Region(
      response.home.id,
      response.home.name,
      response.home.meta
    );
    let roomInstance = new Room(
      response.result.id,
      response.result.name,
      response.result.meta,
      parentRegion
    );
    await roomInstance._loadDevices();

    return roomInstance;
  }

  static async create(name, region) {
    let meta = {};
    let result = await CommonSchema._create(
      name,
      meta,
      null,
      "rooms",
      "result"
    );

    return new Room(result.id, name, meta, region);
  }

  constructor(id, name, meta, parentRegion) {
    super(id, name, meta, "rooms", "room");
    this.devices = [];
    this.favouriteDevices = [];
    this.parentRegion = parentRegion;
  }

  async setFavourite(device, value) {
    if (!this.devices.includes(device) || device.isFavourite() === value)
      return false;
    let result = await device.setFavourite(value);
    if (result) {
      if (value) {
        this.favouriteDevices.push(device);
      } else {
        this.favouriteDevices.splice(this.favouriteDevices.indexOf(device), 1);
      }
    }

    return result;
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

  async _loadDevices() {
    let result = await apiWrapper.rooms.getDevices(this.id);

    this.devices = [];
    this.favouriteDevices = [];
    for (let device of result.devices) {
      device.roomId = this;
      let deviceInstance = DeviceInstantiator.instantiate(device);
      this.devices.push(deviceInstance);
      if (deviceInstance.isFavourite())
        this.favouriteDevices.push(deviceInstance);
    }
  }
}
