let BASE_URL = "/img/devices/";

const ACTIONS = {
  ON: 1,
  OFF: 2,
  OPEN: 3,
  CLOSE: 4,
  LOCK: 5,
  UNLOCK: 6,
  INVARIANT: 7
};

const IMAGES = {
  li6cbv5sdlatti0j: {
    [ACTIONS.ON]: "air-conditioner.svg",
    [ACTIONS.OFF]: ".svg"
  },
  eu0v2xgprrhhg41g: {
    [ACTIONS.OPEN]: "CurtainOpen.svg",
    [ACTIONS.CLOSE]: "CurtainClosed.svg"
  },
  rnizejqr2di0okho: {
    [ACTIONS.INVARIANT]: ".svg"
  },
  lsf78ly0eqrjbz91: {
    [ACTIONS.OPEN]: "OpenDoor.svg",
    [ACTIONS.CLOSE]: "ClosedDoor.svg",
    [ACTIONS.LOCK]: "DoorLock.svg",
    [ACTIONS.UNLOCK]: "DoorUnlock.svg"
  },
  go46xmbqeomjrsjr: {
    [ACTIONS.ON]: ".svg",
    [ACTIONS.OFF]: ".svg"
  },
  im77xxyulpegfmv8: {
    [ACTIONS.ON]: ".svg",
    [ACTIONS.OFF]: ".svg"
  },
  c89b94e8581855bc: {
    [ACTIONS.ON]: ".svg",
    [ACTIONS.OFF]: ".svg"
  },
};

function _getImage(deviceId, action) {
  return BASE_URL + IMAGES[deviceId][action];
}

export default {
  ACTIONS: ACTIONS,

  getImage(device) {
    switch (device.deviceId) {
      case "rnizejqr2di0okho": // FRIDGE
        return ImageRetriever.getImages(
          device.deviceId,
          ImageRetriever.ACTIONS.INVARIANT
        );
      case "c89b94e8581855bc": // SPEAKER
        if (device.state.status === "playing")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.ON
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.OFF
          );
      case "eu0v2xgprrhhg41g": // CURTAINS
        if (device.status === "opened" || device.status === "opening")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.OPEN
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.CLOSE
          );
      case "go46xmbqeomjrsjr": // LAMP
        if (device.state.status === "off")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.OFF
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.ON
          );
      case "im77xxyulpegfmv8": //Oven
        if (device.state.status === "off")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.OFF
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.ON
          );
      case "li6cbv5sdlatti0j": //AC
        if (device.state.status === "off")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.OFF
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.ON
          );
      case "lsf78ly0eqrjbz91": // DOOR
        if (device.state.lock === "locked")
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.LOCK
          );
        else
          return ImageRetriever.getImages(
            device.deviceId,
            ImageRetriever.ACTIONS.UNLOCK
          );
    }
  }
};
