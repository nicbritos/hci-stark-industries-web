import DeviceIds from "./DeviceIds";
import AC from "./AC";
import Door from "./Door";
import Blinds from "./Blinds";
import Lamp from "./Lamp";
import Fridge from "./Fridge";
import Speakers from "./Speakers";
import Oven from "./Oven";

export default {
  instantiate(device) {
    let type = DeviceIds.byId[device.type.id];
    switch (type) {
      case "Air Conditioner":
        return new AC(device.id, device.name, device.meta, device.room);
      case "Blinds":
        return new Blinds(device.id, device.name, device.meta, device.room);
      case "Door":
        return new Door(device.id, device.name, device.meta, device.room);
      case "Lamp":
        return new Lamp(device.id, device.name, device.meta, device.room);
      case "Refrigerator":
        return new Fridge(device.id, device.name, device.meta, device.room);
      case "Speakers":
        return new Speakers(device.id, device.name, device.meta, device.room);
      case "Oven":
        return new Oven(device.id, device.name, device.meta, device.room);
      default:
        return null;
    }
  }
};
