

const BASE_URL='http://127.0.0.1:8081/img/devices/';

export default {
    ACTIONS:{
        ON:1,OFF:2,OPEN:3,CLOSE:4,LOCK:5,UNLOCK:6,INVARIANT:7
    },

     GetImages(deviceId,action){
         console.log("Inside Imge Getter");
         console.log(`deviceId: ${deviceId}`);
         console.log(`action: ${action}`);
         console.log("Colecction of items:");
         console.log(IMAGES);
         console.log("ItemFound");
         console.log(IMAGES.some(element =>{return element.deviceId === deviceId;}));

        if(!IMAGES.some(element =>{return element.deviceId === deviceId;}) )
            return new Error("Invalid Argument: deviceId is not valid");

         console.log("DeviceID is valid");


        let element = IMAGES.find(element =>{return element.deviceId === deviceId;});

         console.log("Element:")
         console.log(element);

        if( !element.images.some(el => {return el.action === action;}))
            return new Error("Invalid Argument: action is not valid");

         console.log("Action is valid");

         let retURL = BASE_URL + element.images.find(img=> {return img.action === action;}).path;
         console.log(retURL);
        return retURL;

    }

}

const ACTIONS={ // NEGRADA
    ON:1,OFF:2,OPEN:3,CLOSE:4,LOCK:5,UNLOCK:6,INVARIANT:7
}

const IMAGES=[
    {
        deviceName:"AC", deviceId:"li6cbv5sdlatti0j",
        images:[
            {action:ACTIONS.ON, path:"air-conditioner.svg"},
            {action:ACTIONS.OFF, path:".svg"},
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
            {action:ACTIONS.INVARIANT, path:".svg"},
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
            {action:ACTIONS.ON, path:".svg"},
            {action:ACTIONS.OFF, path:".svg"},
        ]
    },
    {
        deviceName:"Oven", deviceId:"im77xxyulpegfmv8",
        images:[
            {action:ACTIONS.ON, path:".svg"},
            {action:ACTIONS.OFF, path:".svg"},
        ]
    },
    {
        deviceName:"Speaker", deviceId:"c89b94e8581855bc",
        images:[
            {action:ACTIONS.ON, path:".svg"},
            {action:ACTIONS.OFF, path:".svg"},
        ]
    },
]
