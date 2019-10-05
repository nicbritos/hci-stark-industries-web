const byType = {
  AC: "li6cbv5sdlatti0j",
  Blinds: "eu0v2xgprrhhg41g",
  Door: "lsf78ly0eqrjbz91",
  Lamp: "go46xmbqeomjrsjr",
  Fridge: "rnizejqr2di0okho",
  Speakers: "c89b94e8581855bc",
  Oven: "im77xxyulpegfmv8"
};

let byId = {};
for (let type of Object.keys(byType)) {
  byId[byType[type]] = type;
}

export default {
  byId: byType,
  byType: byType
};
