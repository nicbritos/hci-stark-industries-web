import apiWrapper from "@/data/apiWrapper";

export default class CommonSchema {
  static _formatMeta(meta) {
    return JSON.stringify(meta);
  }

  constructor(id, name, meta) {
    this.id = id;
    this.name = name;
    this.meta = meta;
  }
}
