import DeviceIds from "./DeviceIds";
import AC from "./AC";
import Door from "./Door";
import Blinds from "./Blinds";
import Lamp from "./Lamp";
import Fridge from "./Fridge";
import Speakers from "./Speakers";
import Oven from "./Oven";

export default {
  async create(device) {
    let type = DeviceIds.byId[device.id];

    switch (type) {
      case "Air Conditioner":
        return AC.create(device.name, device.room);
      case "Blinds":
        return Blinds.create(device.name, device.room);
      case "Door":
        return Door.create(device.name, device.room);
      case "Lamp":
        return Lamp.create(device.name, device.room);
      case "Refrigerator":
        return Fridge.create(device.name, device.room);
      case "Speakers":
        return Speakers.create(device.name, device.room);
      case "Oven":
        return Oven.create(device.name, device.room);
      default:
        return null;
    }
  }
};
