


import CommonDeviceSchema from "./devices/CommonDeviceSchema";




export default class Devices{

    static async getAll(){
        let devices = (await (CommonDeviceSchema.getAll()));

        return devices;
    }

    static async getFavourited(){
        let devices = await this.getAll();

        return devices.filter(device=>{return device.isFavourite();});
    }
}