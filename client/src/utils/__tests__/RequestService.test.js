import RequestService from "../RequestService";

const CONFIG = {
  baseURL: "http://localhost:3000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const service = new RequestService(CONFIG);

// Params

test("Default baseUrl value should be empty string", () => {
  let service = new RequestService();
  expect(service.baseURL).toBe("");
});

test("Default headers value should be object", () => {
  let service = new RequestService();
  expect(service.headers).toEqual({});
});

test("baseUrl should be http://localhost:3000/api/", () => {
  let url = "http://localhost:3000/api/";
  let service = new RequestService({ baseURL: url });
  expect(service.baseURL).toBe(url);
});

test("headers should be object", () => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let service = new RequestService({ headers });
  expect(service.headers).toEqual(headers);
});

// getURL method

test("getUrl should return http://localhost:3000/api/lessons", () => {
  expect(service.getUrl("lessons")).toBe("http://localhost:3000/api/lessons");
});

test("getUrl should return http://localhost:3000/api/lessons?id=1&search=title", () => {
  let params = {
    id: 1,
    search: "title",
  };
  expect(service.getUrl("lessons", params)).toBe(
    "http://localhost:3000/api/lessons?id=1&search=title"
  );
});

test("getUrl should return http://localhost:3000/api/", () => {
  expect(service.getUrl()).toBe("http://localhost:3000/api/");
});

// mergeConfig method

test("mergeConfig should return deafult request config", () => {
  let payload = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  expect(service.mergeConfig({})).toEqual(payload);
});

test("mergeConfig should return merged request config", () => {
  let payload = {
    headers: {
      Authorization: "Token few4fdme234sfkewfi32841sdff793",
    },
    body: {
      id: 1,
      name: "Name",
      data: [1, 2, 3, 4],
    },
  };

  let mergedConfig = {
    headers: {
      Accept: "application/json",
      Authorization: "Token few4fdme234sfkewfi32841sdff793",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload.body),
  };
  expect(service.mergeConfig(payload)).toEqual(mergedConfig);
});
