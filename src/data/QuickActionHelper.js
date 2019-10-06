
import apiWrapper from "./apiWrapper";

const QUICK_ACTIONS=[
    {
        deviceName:"AC", deviceId:"li6cbv5sdlatti0j",
        quickAction:{
            description:"Turns ON or OFF the AC",
            action:async function (deviceId,val) {
                if(val)
                    await apiWrapper.devices.performAction(deviceId,"turnOn");
                else
                    await apiWrapper.devices.performAction(deviceId,"turnOff");
            },
            checkState: function (device){
                return device.state.status === "on";
            }
        },

    },
    {
        deviceName:"Curtains", deviceId:"eu0v2xgprrhhg41g",
        quickAction:{
            description:"Opens or closes the curtains",
            action:async function (deviceId,val) {
                if(val)
                    await apiWrapper.devices.performAction(deviceId,"open");
                else
                    await apiWrapper.devices.performAction(deviceId,"close");
            },
            checkState: function (device){
                return device.state.status === "opened" || device.state.status === "opening";
            }

        },

    },
    {
        deviceName:"Fridge", deviceId:"rnizejqr2di0okho",
        quickAction: null
    },
    {
        deviceName:"Door", deviceId:"lsf78ly0eqrjbz91",
        quickAction:{
            description:"Locks or Unlocks the door",
            action:async function (deviceId,val) {
                if(val) {
                    console.log("Lock Door")
                    await apiWrapper.devices.performAction(deviceId, "lock");
                }
                else {
                    console.log("UnLock Door")
                    await apiWrapper.devices.performAction(deviceId, "unlock");
                }
            },
            checkState: function (device){
                console.log(device.state.lock);
                return device.state.lock === "locked";
            }
        },
    },
    {
        deviceName:"Lamp", deviceId:"go46xmbqeomjrsjr",
        quickAction: {
            description: "Turns ON or OFF the lamp",
            action: async function (deviceId, val) {
                if (val)
                    await apiWrapper.devices.performAction(deviceId, "turnOn");
                else
                    await apiWrapper.devices.performAction(deviceId, "turnOff");
            },
            checkState: function (device){
                return device.state.status === "on";
            }
        }

    },
    {
        deviceName:"Oven", deviceId:"im77xxyulpegfmv8",
        quickAction: {
            description: "Turns ON or OFF the oven",
            action: async function (deviceId, val) {
                if (val)
                    await apiWrapper.devices.performAction(deviceId, "turnOn");
                else
                    await apiWrapper.devices.performAction(deviceId, "turnOff");
            },
            checkState: function (device){
                return device.state.status === "on";
            }
        }

    },
    {
        deviceName:"Speaker", deviceId:"c89b94e8581855bc",
        quickAction: {
            description: "Pauses or Resumes the music",
            action: async function (deviceId, val) {
                if (val)
                    await apiWrapper.devices.performAction(deviceId, "resume");
                else
                    await apiWrapper.devices.performAction(deviceId, "pause");
            },
            checkState: function (device){
                return device.state.status === "playing";
            }
        }

    },
]

export default {

    hasQuickAction(deviceTypeID){
        let index = QUICK_ACTIONS.findIndex(element =>{return element.deviceId === deviceTypeID;})
        if(index === -1)
            return new Error("Invalid Argument: deviceId is not valid");

        console.log("Elemtn");
        console.log(QUICK_ACTIONS[index])

        return QUICK_ACTIONS[index] != null;
    },

    getQuickAction(deviceTypeID){
        let index = QUICK_ACTIONS.findIndex(element =>{return element.deviceId === deviceTypeID;})
        if(index === -1)
            return new Error("Invalid Argument: deviceId is not valid");


        return QUICK_ACTIONS[index].quickAction;
    },

    // getQuickActionState(deviceTypeID){
    //     let index = QUICK_ACTIONS.findIndex(element =>{return element.deviceId === deviceTypeID;})
    //     if(index === -1)
    //         return new Error("Invalid Argument: deviceId is not valid");
    //
    //     return QUICK_ACTIONS[index].checkState;
    //
    // }
}