


export default class RoutineHelper {

    static GetActionsForDevice(device){
        if(device === undefined || device.customState === undefined)
            throw new Error("Invalid Argument");

        switch (device.deviceId) {
            case "li6cbv5sdlatti0j":
                return getActionsAC(device);
            case "eu0v2xgprrhhg41g":
                return getActionsCurtains(device);
            case "lsf78ly0eqrjbz91":
                return getActionsDoor(device);
            case "go46xmbqeomjrsjr":
                return getActionsLamp(device);
            case "rnizejqr2di0okho":
                return getActionsFridge(device);
            case "im77xxyulpegfmv8":
                return getActionsOven(device);
            case "c89b94e8581855bc":
                return getActionsSpeaker(device);
            default:
                return null;
        }
    }



}

function getActionsAC(device){

    let state = device.customState;
    let actions =[];

    if(state.isOn)
        actions.push(getAction(device.id,'turnOn'));

    actions.push(getAction(device.id,'setTemperature',state.temperature));
    actions.push(getAction(device.id,'setFanSpeed',state.fanSpeed));
    actions.push(getAction(device.id,'setMode',state.ACmode));
    actions.push(getAction(device.id,'setVerticalSwing',state.vertical_blades));
    actions.push(getAction(device.id,'setHorizontalSwing',state.horizontal_blades));

    if(!state.isOn)
    {
        actions.push(getAction(device.id,'turnOff'));
    }
    return actions;
};

function getActionsCurtains(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    if(state.isOpen)
        actions.push(getAction(id,'open'));
    else
        actions.push(getAction(id,'open'));

    return actions;
};

function getActionsFridge(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    actions.push(getAction(id,'setMode',state.mode));
    actions.push(getAction(id,'setTemperature',state.temperature));
    actions.push(getAction(id,'setFreezerTemperature',state.freezerTemperature));

    return actions;
};

function getActionsDoor(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    if(state.open) {
        actions.push(getAction(id, 'unlock'));
        actions.push(getAction(id, 'open'));
    }
    else{
        actions.push(getAction(id,'close'));
        if(state.locked)
            actions.push(getAction(id,'lock'));
        else
            actions.push(getAction(id,'unlock'));
    }


    return actions;
};

function getActionsLamp(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    console.log(state);

    if(state.isOn) {
        actions.push(getAction(id, 'turnOn'));
        actions.push(getAction(id,'setColor',state.color));
        actions.push(getAction(id,'setBrightness', state.brightness));
    }
    else {
        actions.push(getAction(id, 'setColor', state.color));
        actions.push(getAction(id, 'setBrightness', state.brightness));
        actions.push(getAction(id, 'turnOff'));
    }



    return actions;
};


function getActionsOven(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    if(state.isOn) {
        actions.push(getAction(id, 'turnOn'));
        actions.push(getAction(id,'setTemperature',state.temperature));
        actions.push(getAction(id,'setHeat', state.heat_source));
        actions.push(getAction(id,'setGrill', state.grill));
        actions.push(getAction(id,'setConvection', state.convection));
    }
    else {
        actions.push(getAction(id,'setTemperature',state.temperature));
        actions.push(getAction(id,'setHeat', state.heat_source));
        actions.push(getAction(id,'setGrill', state.grill));
        actions.push(getAction(id,'setConvection', state.convection));
        actions.push(getAction(id, 'turnOff'));
    }



    return actions;
};

function getActionsSpeaker(device) {
    let state = device.customState;
    let id = device.id;
    let actions =[];

    actions.push(getAction(id,'setGenre',state.genre));
    actions.push(getAction(id,'setVolume', state.volume));


    if(state.currentSong.name === ""){
        actions.push(getAction(id,'stop'));
    }else{
        actions.push(getAction(id,'play'));
        if(!state.currentSong.isPlaying)
            actions.push(getAction(id,'pause'));
    }


    return actions;
};

function getAction(deviceId,name,...param) {


    let temp = {
        device: {
            id: deviceId
        },
        actionName: name,
        params: param,
        meta: {}
    };
    return temp;
};

