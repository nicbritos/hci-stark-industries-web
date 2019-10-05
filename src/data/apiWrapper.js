const TRANSPORT = "http://";
const BASE_URL = "127.0.0.1";
const PORT = "9090";

const URL = TRANSPORT + BASE_URL + ":" + PORT + "/api";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

const ERRORS = {
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "You are not authorized to perform the requested operation",
  FORBIDDEN: "You don't have permissions to perform the requested operation",
  NOT_FOUND: "Resource cannot be found",
  INTERNAL: "Internal error",
  NETWORK: "Unknown network error"
};

const ERROR_CODES = {
  400: ERRORS.BAD_REQUEST,
  401: ERRORS.UNAUTHORIZED,
  403: ERRORS.FORBIDDEN,
  404: ERRORS.NOT_FOUND,
  405: ERRORS.INTERNAL,
  409: ERRORS.INTERNAL,
  500: ERRORS.INTERNAL,
  503: ERRORS.INTERNAL
};

const URLS = {
  devices: {
    list: {
      url: composeURL(URL, "devices"),
      method: METHODS.GET
    },
    listByType: {
      url: composeURL(URL, "devices", "devicetypes"),
      method: METHODS.GET
    },
    get: {
      url: composeURL(URL, "devices"),
      method: METHODS.GET
    },
    create: {
      url: composeURL(URL, "devices"),
      method: METHODS.POST
    },
    update: {
      url: composeURL(URL, "devices"),
      method: METHODS.PUT
    },
    addToRoom: {
      url: composeURL(URL, "devices"),
      method: METHODS.POST
    },
    deleteFromRoom: {
      url: composeURL(URL, "devices"),
      method: METHODS.DELETE
    },
    delete: {
      url: composeURL(URL, "devices"),
      method: METHODS.DELETE
    }
  },
  routines: {
    list: {
      url: composeURL(URL, "routines"),
      method: METHODS.GET
    },
    get: {
      url: composeURL(URL, "routines"),
      method: METHODS.GET
    },
    create: {
      url: composeURL(URL, "routines"),
      method: METHODS.POST
    },
    update: {
      url: composeURL(URL, "routines"),
      method: METHODS.PUT
    },
    execute: {
      url: composeURL(URL, "routines"),
      method: METHODS.PUT
    },
    delete: {
      url: composeURL(URL, "routines"),
      method: METHODS.DELETE
    }
  },
  rooms: {
    list: {
      url: composeURL(URL, "rooms"),
      method: METHODS.GET
    },
    get: {
      url: composeURL(URL, "rooms"),
      method: METHODS.GET
    },
    getDevices: {
      url: composeURL(URL, "rooms"),
      method: METHODS.GET
    },
    create: {
      url: composeURL(URL, "rooms"),
      method: METHODS.POST
    },
    update: {
      url: composeURL(URL, "rooms"),
      method: METHODS.PUT
    },
    delete: {
      url: composeURL(URL, "rooms"),
      method: METHODS.DELETE
    }
  }
};

function composeURL(...dirs) {
  return dirs.join("/");
}

async function requestQuery(url, method, data) {
  let response;

  let init = {
    method: method
  };
  if (typeof data === "object") {
    init.body = JSON.stringify(data);
    init.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  try {
    response = await fetch(url, init);
  } catch (error) {
    throw ERRORS.NETWORK;
  }
  if (!response.ok) throw new Error(response.statusText); // TODO: Change to known errors
  return response.json();
}

// Every method returns a (processed) Promise
// A successful query returns an Object as specified by the API documentation
// An unsuccessful query throws an according Error (see error list)
export default {
  ERRORS: ERRORS,

  devices: {
    getAll: async () => {
      return await requestQuery(
        URLS.devices.list.url,
        URLS.devices.list.method
      );
    },
    getByType: async typeId => {
      return await requestQuery(
        composeURL(URLS.devices.listByType.url, typeId),
        URLS.devices.listByType.method
      );
    },
    get: async deviceId => {
      return await requestQuery(
        composeURL(URLS.devices.list.url, deviceId),
        URLS.devices.list.method
      );
    },
    create: async data => {
      return await requestQuery(
        URLS.devices.create.url,
        URLS.devices.create.method,
        data
      );
    },
    update: async (deviceId, data) => {
      return await requestQuery(
        composeURL(URLS.devices.update.url, deviceId),
        URLS.devices.update.method,
        data
      );
    },
    performAction: async (deviceId, actionName, params) => {
      return await requestQuery(
        composeURL(URLS.devices.performAction.url, deviceId, actionName),
        URLS.devices.performAction.method,
        params
      );
    },
    addToRoom: async (deviceId, roomId) => {
      return await requestQuery(
        composeURL(URLS.devices.addToRoom.url, deviceId, "rooms", roomId),
        URLS.devices.addToRoom.method
      );
    },
    deleteFromRooms: async deviceId => {
      return await requestQuery(
        composeURL(URLS.devices.deleteFromRoom.url, deviceId),
        URLS.devices.deleteFromRoom.method
      );
    },
    delete: async deviceId => {
      return await requestQuery(
        composeURL(URLS.devices.delete.url, deviceId),
        URLS.devices.delete.method
      );
    }
  },
  rooms: {
    getAll: async () => {
      return await requestQuery(URLS.rooms.list.url, URLS.rooms.list.method);
    },
    get: async roomId => {
      return await requestQuery(
        composeURL(URLS.rooms.get.url, roomId),
        URLS.rooms.get.method
      );
    },
    getDevices: async roomId => {
      return await requestQuery(
        composeURL(URLS.rooms.getDevices.url, roomId, "devices"),
        URLS.rooms.getDevices.method
      );
    },
    create: async data => {
      return await requestQuery(
        URLS.rooms.create.url,
        URLS.rooms.create.method,
        data
      );
    },
    update: async (roomId, data) => {
      return await requestQuery(
        composeURL(URLS.rooms.update.url, roomId),
        URLS.rooms.update.method,
        data
      );
    },
    delete: async roomId => {
      return await requestQuery(
        composeURL(URLS.rooms.delete.url, roomId),
        URLS.rooms.delete.method
      );
    }
  },
  routines: {
    getAll: async () => {
      return await requestQuery(
        URLS.routines.list.url,
        URLS.routines.list.method
      );
    },
    get: async routineId => {
      return await requestQuery(
        composeURL(URLS.routines.get.url, routineId),
        URLS.routines.get.method
      );
    },
    create: async data => {
      return await requestQuery(
        URLS.routines.create.url,
        URLS.routines.create.method,
        data
      );
    },
    update: async (routineId, data) => {
      return await requestQuery(
        composeURL(URLS.routines.update.url, routineId),
        URLS.routines.update.method,
        data
      );
    },
    execute: async routineId => {
      return await requestQuery(
        composeURL(URLS.routines.execute.url, routineId, "execute"),
        URLS.routines.update.method
      );
    },
    delete: async routineId => {
      return await requestQuery(
        composeURL(URLS.routines.delete.url, routineId),
        URLS.routines.delete.method
      );
    }
  }
};
