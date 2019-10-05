import DeviceIds from "./DeviceIds";
import AC from "./AC";
import Door from "./Door";
import Blinds from "./Blinds";
import Lamp from "./Lamp";

export default {
  instantiate(device) {
    let type = DeviceIds.byId[device.typeId];
    switch (type) {
      case "AC":
        return new AC(device.id, device.name, JSON.parse(device.meta));
      case "Door":
        return new Door(device.id, device.name, JSON.parse(device.meta));
      case "Blinds":
        return new Blinds(device.id, device.name, JSON.parse(device.meta));
      case "Lamp":
        return new Lamp(device.id, device.name, JSON.parse(device.meta));
      default:
        return null;
    }
  }
};
