export default class CommonSchema {
  static deviceId() {
    throw new Error("This function needs to be overwritten");
  }

  static _formatMeta(meta) {
    return JSON.stringify(meta);
  }
}
