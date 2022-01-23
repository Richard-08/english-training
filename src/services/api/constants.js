const PORT = process.env.PORT || "3300";

export const BASE_CONFIG = {
  baseURL: `http://localhost:${PORT}/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
