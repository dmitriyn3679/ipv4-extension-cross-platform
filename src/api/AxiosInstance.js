import axios from "axios";
import {resetProxyParams} from "../utils/helpers/resetProxyParams";
import {tokenName} from "../utils/helpers/browserIdToken";
export let $api;

$api = axios.create({
  baseURL: "https://stage.proxy-ipv4.com",
  withCredentials: true
});

$api.interceptors.request.use((config) => {
  const clientToken = localStorage.getItem(tokenName);
  config.headers[tokenName] = clientToken;
  return config;
})

$api.interceptors.response.use(
  (response) => {
    try {
      if (response.data.slice(0, 15) === "<!doctype html>") {
        // localStorage.removeItem("token");
        // localStorage.removeItem("client_profile");
        resetProxyParams();
        window.location.href = "/";
        return null;
      } else {
        return response;
      }
    } catch (e) {
      return response;
    }
  },
  (error) => {
    if (error?.code === "ERR_CANCELED") {
      return error;
    }
    try {
      if (error.config.url === "/api/login") {
        return error;
      }
    } catch (e) {
      console.error("Login error", e);
    }
    if (error.response === undefined) {
      // localStorage.removeItem("token");
      // localStorage.removeItem("client_profile");
      window.location.href = "/";
      return null;
    } else {
      return error;
    }
  }
);
