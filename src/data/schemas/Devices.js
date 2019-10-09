import apiWrapper from "../apiWrapper";


export default class Devices{

    static async getAll(){
        return await apiWrapper.devices.getAll();
    }

    static async getFavourtites(){
        let devices = await apiWrapper.devices.getAll();

        return devices.filter(el=>{return el.meta.favourited;});
    }

    static async setFavourite(deviceId, value){
        let result = await apiWrapper.devices.update(deviceId,{
            favourited:value
        });

        return result;
    }

}