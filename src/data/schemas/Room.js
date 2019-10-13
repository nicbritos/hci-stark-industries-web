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
    let meta = {
      count: 0
    };
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

   getCount() {
    return this.devices.length
  }

  async createDevice(data) {
    let device = Object.assign({}, data);
    device.room = this;



    let deviceInstance = await DeviceCreator.create(device.device);

    await apiWrapper.devices.addToRoom(deviceInstance.id, this.id);
    this.devices.push(deviceInstance);

    let newMeta = Object.assign({}, this.meta);
    newMeta.count++;
    await this._updateMeta(newMeta);

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

  async deleteDevice(device) {
    let index = this.devices.indexOf(device);

    if (index === -1) return false;
    let favIndex = this.favouriteDevices.indexOf(device);

    let result = await device.delete();
    if (result) {
      this.devices.splice(index, 1);
      if (favIndex !== -1) {
        this.favouriteDevices.splice(favIndex, 1);
      }
      this.meta.count--;
      this._updateMeta(this.meta);
      this.refreshInformation();



    }

    return result;
  }

  async delete() {
    for (let device of this.devices) {
      await device.delete();
    }
    return super.delete();
  }
}
