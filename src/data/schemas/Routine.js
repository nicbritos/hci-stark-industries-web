import apiWrapper from "../apiWrapper";
import CommonSchema from "./CommonSchema";

function adjustNumberRange(value, min, max) {
  value = Math.floor(value);
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// Data extracted from API Docs
export default class Routine extends CommonSchema {
  static async getAll() {
    let routines = await apiWrapper.routines.getAll();
    let output = [];
    for (let routine of routines) {
      let routineInstance = new Routine(
        routine.id,
        routine.name,
        routine.actions,
        routine.result.meta
      );
      output.push(routineInstance);
    }

    return output;
  }

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

  isFavourite() {
    return this.meta ? !!this.meta.favourite : false;
  }

  async setFavourite(value) {
    let nextValue = !!value;
    if (this.meta.favourite === nextValue) return false;

    let metaCopy = Object.assign({}, this.meta);
    metaCopy.favourite = nextValue;
    let result = await apiWrapper.routines.update(this.id, {
      name: this.name,
      id: this.id,
      meta: metaCopy
    });

    if (result.result) this.meta.favourite = nextValue;
    return !!result.result;
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
