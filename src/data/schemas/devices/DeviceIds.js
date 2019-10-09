const byType = {
  "Air Conditioner": "li6cbv5sdlatti0j",
  Blinds: "eu0v2xgprrhhg41g",
  Door: "lsf78ly0eqrjbz91",
  Lamp: "go46xmbqeomjrsjr",
  Refrigerator: "rnizejqr2di0okho",
  Oven: "im77xxyulpegfmv8",
  Speaker: "c89b94e8581855bc"
};

let byId = {};
for (let type of Object.keys(byType)) {
  byId[byType[type]] = type;
}

export default {
  byId: byId,
  byType: byType
};
