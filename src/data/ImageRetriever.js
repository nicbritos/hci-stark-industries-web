let BASE_URL =
  location.protocol +
  "//" +
  location.hostname +
  ":" +
  location.port +
  "/img/devices/";

export default {
    ACTIONS: {
        ON: 1,
        OFF: 2,
        OPEN: 3,
        CLOSE: 4,
        LOCK: 5,
        UNLOCK: 6,
        INVARIANT: 7
    },

    GetImages(deviceId, action) {


        if (!IMAGES.some(element => {
            return element.deviceId === deviceId;
        }))
            return new Error("Invalid Argument: deviceId is not valid");

        let element = IMAGES.find(element => {
            return element.deviceId === deviceId;
        });

        if (!element.images.some(el => {
            return el.action === action;
        }))
            return new Error("Invalid Argument: action is not valid");

        let retURL = BASE_URL + element.images.find(img => {
            return img.action === action;
        }).path;
        console.log(retURL);
        return retURL;
    }
}

const ACTIONS= {
    ON: 1,
        OFF: 2,
        OPEN: 3,
        CLOSE: 4,
        LOCK: 5,
        UNLOCK: 6,
        INVARIANT: 7
};


const IMAGES=[
    {
        deviceName:"AC", deviceId:"li6cbv5sdlatti0j",
        images:[
            {action:ACTIONS.ON, path:"air-conditioner-on.svg"},
            {action:ACTIONS.OFF, path:"air-conditioner-off.svg"},
        ]
    },
    {
        deviceName:"Curtains", deviceId:"eu0v2xgprrhhg41g",
        images:[
            {action:ACTIONS.OPEN, path:"CurtainOpen.svg"},
            {action:ACTIONS.CLOSE, path:"CurtainClosed.svg"},
        ]
    },
    {
        deviceName:"Fridge", deviceId:"rnizejqr2di0okho",
        images:[
            {action:ACTIONS.INVARIANT, path:"fridge.svg"},
        ]
    },
    {
        deviceName:"Door", deviceId:"lsf78ly0eqrjbz91",
        images:[
            {action:ACTIONS.OPEN, path:"OpenDoor.svg"},
            {action:ACTIONS.CLOSE, path:"ClosedDoor.svg"},
            {action:ACTIONS.LOCK, path:"DoorLock.svg"},
            {action:ACTIONS.UNLOCK, path:"DoorUnlock.svg"},
        ]
    },
    {
        deviceName:"Lamp", deviceId:"go46xmbqeomjrsjr",
        images:[
            {action:ACTIONS.ON, path:"lightbulb-on.svg"},
            {action:ACTIONS.OFF, path:"lightbulb-off.svg"},
        ]
    },
    {
        deviceName:"Oven", deviceId:"im77xxyulpegfmv8",
        images:[
            {action:ACTIONS.ON, path:"oven-on.svg"},
            {action:ACTIONS.OFF, path:"oven-off.svg"},
        ]
    },
    {
        deviceName:"Speaker", deviceId:"c89b94e8581855bc",
        images:[
            {action:ACTIONS.ON, path:"speaker-on.svg"},
            {action:ACTIONS.OFF, path:"speaker-off.svg"},
        ]
    }
     ]