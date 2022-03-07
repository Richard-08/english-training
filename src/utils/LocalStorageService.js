class LocalStorageService {
  exists() {
    return window.localStorage !== undefined;
  }

  get(key) {
    if (!this.exists) {
      return;
    }
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    if (!this.exists) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    if (!this.exists) {
      return;
    }
    localStorage.removeItem(key);
  }
}

export default new LocalStorageService();