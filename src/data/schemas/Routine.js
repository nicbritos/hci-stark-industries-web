import apiWrapper from "../apiWrapper";
import CommonSchema from "CommonSchema";

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// Data extracted from API Docs
export default class Routine extends CommonSchema {
  static async create(name, description, actions) {
    let meta = {
      description: description
    };

    let result = await CommonSchema._create(
      name,
      meta,
      { actions: JSON.stringify(actions) },
      "routines",
      "routine"
    );

    return new Routine(result.id, name, actions, meta);
  }

  constructor(id, name, actions, meta) {
    super(id, name, meta, "routines", "routine");

    this.actions = actions;
  }

  async updateDescription(newDescription) {
    if (typeof newDescription !== "string" && newDescription != null)
      throw new Error("Wrong description format");
    if (
      newDescription == null ||
      (newDescription = newDescription.trim()).length === 0
    )
      newDescription = "";

    if (this.meta.description === newDescription) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.description = newDescription;
    let result = await apiWrapper.routines.update(this.id, {
      name: this.name,
      id: this.id,
      meta: CommonSchema._formatMeta(metaCopy)
    });

    if (result.result != null) this.meta.description = newDescription;
    return !!result.result;
  }

  async addAction(index, deviceId, actionName, params, meta) {
    index = adjustNumberRange(index, 0, this.actions.length);
    let newActionList = JSON.parse(JSON.stringify(this.actions));
    newActionList.splice(index, 0, {
      deviceId: deviceId,
      actionName: actionName,
      params: params,
      meta: meta
    });

    let result = await apiWrapper.routines.update(this.id, {
      name: this.name,
      actions: JSON.stringify(newActionList),
      meta: CommonSchema._formatMeta(this.meta)
    });

    if (result.result) this.actions = newActionList;
    return !!result.result;
  }

  async removeAction(index) {
    if (index < 0 || index >= this.actions.length) throw new Error("Invalid index");

    let newActionList = JSON.parse(JSON.stringify(this.actions));
    newActionList.splice(index, 1);

    let result = await apiWrapper.routines.update(this.id, {
      name: this.name,
      actions: JSON.stringify(newActionList),
      meta: CommonSchema._formatMeta(this.meta)
    });

    if (result.result) this.actions = newActionList;
    return !!result.result;
  }

  async changeName(newName) {
    return this._changeName(newName);
  }

  async execute() {
    return await apiWrapper.routines.execute(this.id);
  }
}
