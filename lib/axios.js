import Axios from "axios";

const axios = Axios.create({
  // baseURL: '/api',
  baseURL: "http://localhost:3006",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});


axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    console.log(error.response.status);

    if (error.response.status == 401) {
      window.location.href = "/auth/login";
    }

    if (error.response.status == 403) {
      window.location.href = "/403";
    }

    return Promise.reject(error);
  }
);

export default axios;
