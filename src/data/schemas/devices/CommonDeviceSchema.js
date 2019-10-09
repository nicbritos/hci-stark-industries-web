import apiWrapper from "@/data/apiWrapper";
import CommonSchema from "../CommonSchema";

// Data extracted from API Docs
const ACTION_NAMES = {
  getState: "getState"
};

export default class CommonDeviceSchema extends CommonSchema {
  static async _create(name, deviceId, customMetadata) {
    let meta = {
      favourite: false
    };
    if (customMetadata != null) {
      meta = Object.assign(meta, customMetadata);
    }

    let result = await CommonSchema._create(
      name,
      meta,
      { typeId: deviceId },
      "devices",
      "device"
    );

    return { id: result.id, name: name, meta: meta, roomId: null };
  }

  constructor(id, name, meta, deviceId, roomId) {
    super(id, name, meta, "devices", "device");

    this.deviceId = deviceId;
    this.roomId = roomId;
  }

  isFavourite() {
    return this.meta ? !!this.meta.favourite : false;
  }

  async setFavourite(value) {
    let nextValue = !!value;
    if (this.meta.favourite === nextValue) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.favourite = nextValue;
    let result = await apiWrapper.devices.update(this.id, {
      name: name,
      typeId: this.deviceId,
      id: this.id,
      meta: CommonDeviceSchema._formatMeta(metaCopy)
    });

    // eslint-disable-next-line require-atomic-updates
    if (result.result) this.meta.favourite = nextValue;
    return !!result.result;
  }

  async changeName(newName) {
    return CommonSchema._changeName(newName, {
      typeId: this.deviceId
    });
  }

  async addToRoom(roomId) {
    let result = await apiWrapper.devices.addToRoom(this.id, roomId);
    if (result.result) this.roomId = roomId;
    return !!result.result;
  }

  async deleteFromRoom() {
    if (this.roomId == null) return false;
    let result = await apiWrapper.devices.deleteFromRoom(this.id, this.roomId);
    return !!result.result;
  }

  async _getState() {
    console.log("En GetState, Por hacer performAction");
    let result = await apiWrapper.devices.getState(this.id);

    console.log(result);

    console.log("Saliendo de GET state");

    return result.result;
  }

  async refreshState() {
    throw new Error("This method should be overwritten");
  }
}
