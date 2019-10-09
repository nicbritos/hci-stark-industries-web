import DeviceInstantiator from "./devices/DeviceInstantiator";
import apiWrapper from "../apiWrapper";
import CommonSchema from "./CommonSchema";
import Region from "./Region";
import CommonDeviceSchema from "./devices/CommonDeviceSchema";
import DeviceCreator from "./devices/DeviceCreator";

// Data extracted from API Docs
export default class Room extends CommonSchema {
  static async get(roomId) {
    let response = await apiWrapper.rooms.get(roomId);
    let result = response.result;
    let region = result.home;

    let parentRegion = new Region(region.id, region.name, region.meta);
    let roomInstance = new Room(
      result.id,
      result.name,
      result.meta,
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
    await apiWrapper.regions.addRoom(region.id, result.id);

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

  async createDevice(data) {
    let device = Object.assign({}, data);
    device.room = this;

    let deviceInstance = await DeviceCreator.create(device);
    await apiWrapper.devices.addToRoom(deviceInstance.id, this.id);
    this.devices.push(deviceInstance);
    return deviceInstance;
  }

  async changeName(newName) {
    return this._changeName(newName);
  }

  async _loadDevices() {
    let result = (await apiWrapper.rooms.getDevices(this.id)).result;

    this.devices = [];
    this.favouriteDevices = [];
    for (let device of result) {
      device.room = this;
      let deviceInstance = DeviceInstantiator.instantiate(device);
      this.devices.push(deviceInstance);
      if (deviceInstance.isFavourite())
        this.favouriteDevices.push(deviceInstance);
    }
  }
}
