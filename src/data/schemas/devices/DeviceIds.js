const byType = {
  AC: "li6cbv5sdlatti0j",
  Blinds: "eu0v2xgprrhhg41g",
  Door: "lsf78ly0eqrjbz91",
  Lamp: "go46xmbqeomjrsjr",
  Frige: "rnizejqr2di0okho"
};

let byId = {};
for (let type of Object.keys(byType)) {
  byId[byType[type]] = type;
}

export default {
  byId: byType,
  byType: byType
};
