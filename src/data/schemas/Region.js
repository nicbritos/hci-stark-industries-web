import apiWrapper from "../apiWrapper";
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
        region.meta
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




















  async changeName(newName) {
    return this._changeName(newName);
  }












  async delete() {
    for (let room of this.rooms) {
      await room.delete();
    }
    return super.delete();
  }
}
