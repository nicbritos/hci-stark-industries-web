import apiWrapper from "./apiWrapper";

const QUICK_ACTIONS = [
  {
    deviceName: "AC",
    deviceId: "li6cbv5sdlatti0j",
    quickAction: {
      description: "Turns ON or OFF the AC",
      action: async function(AC, val) {
        if (val)
          await AC.turnOn();
        else
          await AC.turnOff();
      },
      checkState: function(device) {
        return device.isOn;
      }
    }
  },
  {
    deviceName: "Curtains",
    deviceId: "eu0v2xgprrhhg41g",
    quickAction: {
      description: "Opens or closes the curtains",
      action: async function(Curt, val) {
        if (val) await Curt.open();
        else await Curt.close();
      },
      checkState: function(device) {
        return (
          device.isOpen
        );
      }
    }
  },
  {
    deviceName: "Fridge",
    deviceId: "rnizejqr2di0okho",
    quickAction: null
  },
  {
    deviceName: "Door",
    deviceId: "lsf78ly0eqrjbz91",
    quickAction: {
      description: "Locks or Unlocks the door",
      action: async function(door, val) {
        if (val  ) {
          if(!door.isOpen) {
            console.log("Lock Door");
            await door.lock();
          }
        } else {
          console.log("UnLock Door");
          await door.unlock();
        }
      },
      checkState: function(device) {
        return device.isLocked;
      }
    }
  },
  {
    deviceName: "Lamp",
    deviceId: "go46xmbqeomjrsjr",
    quickAction: {
      description: "Turns ON or OFF the lamp",
      action: async function(lamp, val) {
        if (val)
          await lamp.turnOn();
        else
          await lamp.turnOff();
      },
      checkState: function(device) {
        return device.isOn;
      }
    }
  },
  {
    deviceName: "Oven",
    deviceId: "im77xxyulpegfmv8",
    quickAction: {
      description: "Turns ON or OFF the oven",
      action: async function(oven, val) {
        if (val)
          await oven.turnOn();
        else
          await oven.turnOff();
      },
      checkState: function(device) {
        return device.isOn;
      }
    }
  },
  {
    deviceName: "Speaker",
    deviceId: "c89b94e8581855bc",
    quickAction: {
      description: "Pauses or Resumes the music",
      action: async function(speaker, val) {
        if (val) {
          if (speaker.status === 'paused')
            await speaker.resume();
          else if (speaker.status === 'stopped')
            await speaker.play();
        }
        else
          await speaker.pause();
      },
      checkState: function(device) {
        return device.status === "playing";
      }
    }
  }
];

export default {
  hasQuickAction(deviceTypeID) {
    let index = QUICK_ACTIONS.findIndex(element => {
      return element.deviceId === deviceTypeID;
    });
    if (index === -1)
      return new Error("Invalid Argument: deviceId is not valid");

    console.log("Elemtn");
    console.log(QUICK_ACTIONS[index]);

    return QUICK_ACTIONS[index] != null;
  },

  getQuickAction(deviceTypeID) {
    let index = QUICK_ACTIONS.findIndex(element => {
      return element.deviceId === deviceTypeID;
    });
    if (index === -1)
      return new Error("Invalid Argument: deviceId is not valid");

    return QUICK_ACTIONS[index].quickAction;
  }

  // getQuickActionState(deviceTypeID){
  //     let index = QUICK_ACTIONS.findIndex(element =>{return element.deviceId === deviceTypeID;})
  //     if(index === -1)
  //         return new Error("Invalid Argument: deviceId is not valid");
  //
  //     return QUICK_ACTIONS[index].checkState;
  //
  // }
};
