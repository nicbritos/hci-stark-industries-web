import DeviceIds from "./DeviceIds";
import AC from "./AC";
import Door from "./Door";
import Blinds from "./Blinds";
import Lamp from "./Lamp";

export default {
  async create(device) {
    let type = DeviceIds.byId[device.typeId];
    switch (type) {
      case "Air Conditioner":
        return AC.create(device.name, device.room);
      case "Door":
        return Door.create(
          device.id,
          device.name,
          JSON.parse(device.meta),
          device.room
        );
      case "Blinds":
        return Blinds.create(
          device.id,
          device.name,
          JSON.parse(device.meta),
          device.room
        );
      case "Lamp":
        return Lamp.create(
          device.id,
          device.name,
          JSON.parse(device.meta),
          device.room
        );
      default:
        return null;
    }
  }
};
