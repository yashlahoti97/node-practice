import http from "./httpService";
import { apiURL } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiURL + "/auth";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  loginWithJWT,
  getCurrentUser,
  getJWT,
};
