import apiWrapper from "@/data/apiWrapper";
import CommonSchema from "./CommonSchema";
import Room from "./Room";

// Data extracted from API Docs
export default class Region extends CommonSchema {
  static async getAll() {
    let response = await apiWrapper.regions.getAll();
    let output = [];
    for (let region of response.result) {
      let regionInstance = new Region(
        region.id,
        region.name,
        response.result.meta
      );
      output.push(regionInstance);
      await regionInstance._loadRooms();
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

    let region = new Region(result.id, name, meta);
    await region._loadRooms();
    return region;
  }

  constructor(id, name, meta) {
    super(id, name, meta, "regions", "result");

    this.rooms = [];
  }

  async _loadRooms() {
    let rooms = (await apiWrapper.regions.getRooms(this.id)).result;
    this.rooms = [];
    for (let room of rooms) {
      this.rooms.push(new Room(room.id, room.name, room.meta, this));
    }
  }

  async createRoom(name) {
    let room = await Room.create(name, this);
    await apiWrapper.regions.addRoom(this.id, room.id);
    this.rooms.push(room);
    return room;
  }

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
