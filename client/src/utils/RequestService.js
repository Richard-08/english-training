export default class RequestService {
  constructor(config) {
    this.baseURL = (config && config.baseURL) || "";
    this.headers = (config && config.headers) || {};
  }

  getUrl(url, params) {
    if (params) {
      return this.baseURL + url + "?" + new URLSearchParams(params).toString();
    }

    if (url) {
      return this.baseURL + url;
    }

    return this.baseURL;
  }

  mergeConfig(payload) {
    const data = {
      ...payload,
      headers: { ...this.headers, ...(payload.headers || {}) },
    };
    if (payload.body) {
      data.body = JSON.stringify(payload.body);
    }
    return data;
  }

  request(url, payload) {
    return fetch(url, payload).then((response) => response.json());
  }

  get(url, payload = {}) {
    return this.request(this.getUrl(url, payload.params), {
      method: "GET",
      ...this.mergeConfig(payload),
    });
  }

  post(url, payload = {}) {
    return this.request(this.getUrl(url), {
      method: "POST",
      ...this.mergeConfig(payload),
    });
  }

  put(url, payload = {}) {
    return this.request(this.getUrl(url), {
      method: "PUT",
      ...this.mergeConfig(payload),
    });
  }

  delete(url, payload = {}) {
    return this.request(this.getUrl(url), {
      method: "DELETE",
      ...this.mergeConfig(payload),
    });
  }
}
