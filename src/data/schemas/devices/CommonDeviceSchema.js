import apiWrapper from "../../apiWrapper";
import CommonSchema from "../CommonSchema";
import DeviceInstantiator from "./DeviceInstantiator";

export default class CommonDeviceSchema extends CommonSchema {
  static async getAll() {
    let devices = await apiWrapper.devices.getAll();
    let output = [];
    for (let device of devices) {
      let deviceInstance = DeviceInstantiator.instantiate(device);
      if (deviceInstance != null) output.push(deviceInstance);
    }

    return output;
  }

  static async _create(name, deviceId, customMetadata, room) {
    let meta = {
      favourite: false
    };
    if (room && room.id) meta.room = room.id;

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

    return { id: result.id, name: name, meta: meta, room: room };
  }

  constructor(id, name, meta, deviceId, room) {
    super(id, name, meta, "devices", "device");

    this.deviceId = deviceId;
    this.room = room;
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
      name: this.name,
      typeId: this.deviceId,
      id: this.id,
      meta: CommonDeviceSchema._formatMeta(metaCopy)
    });

    if (result.result) this.meta.favourite = nextValue;
    return !!result.result;
  }

  async changeName(newName) {
    return CommonSchema._changeName(newName, {
      typeId: this.deviceId
    });
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
