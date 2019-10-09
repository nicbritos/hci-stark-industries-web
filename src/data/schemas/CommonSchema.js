import apiWrapper from "../apiWrapper";

export default class CommonSchema {
  static _formatMeta(meta) {
    return meta;
  }

  static async _create(name, meta, customData, type, serverReturnTypeName) {
    let output = {
      name: name,
      meta: this._formatMeta(meta)
    };
    if (customData != null) {
      output = Object.assign(output, customData);
    }

    return (await apiWrapper[type].create(output))[serverReturnTypeName];
  }

  constructor(id, name, meta, type, serverReturnTypeName) {
    this.id = id;
    this.name = name;
    this.meta = meta;
    this.type = type;
    this.serverReturnTypeName = serverReturnTypeName;
  }

  async _changeName(newName, customData) {
    if (typeof newName !== "string" || (newName = newName.trim()).length === 0)
      return false;

    let output = {
      name: newName,
      meta: this.meta
    };
    if (customData != null) {
      output = Object.assign(output, customData);
    }

    let result = await apiWrapper[this.type].update(this.id, output);
    if (result.result) this.name = newName;
    return !!result.result;
  }

  async refreshInformation() {
    let result = await apiWrapper[this.type].get(this.id);
    this.name = result[this.serverReturnTypeName].name;
    this.meta = JSON.parse(result[this.serverReturnTypeName].meta);
    return true;
  }

  async delete() {
    return (await apiWrapper[this.type].delete(this.id)).result;
  }
}
