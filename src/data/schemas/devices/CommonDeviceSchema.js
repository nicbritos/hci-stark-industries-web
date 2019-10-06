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

    return { id: result.id, name: name, meta: meta };
  }

  constructor(id, name, meta, deviceId) {
    super(id, name, meta, "devices", "device");

    this.deviceId = deviceId;
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
    return !!result.result;
  }

  async deleteFromRooms() {
    let result = await apiWrapper.devices.deleteFromRooms(this.id);
    return !!result.result;
  }

  async _getState() {
    console.log("En GetState, Por hacer performAction")
    let result = await apiWrapper.devices.getState(
      this.id
    );

    console.log(result);

    console.log("Saliendo de GET state")

    return result.result;
  }

  async refreshState() {
    throw new Error("This method should be overwritten");
  }
}
