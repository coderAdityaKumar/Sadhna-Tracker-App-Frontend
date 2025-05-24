// src/utils/tokenUtils.js
import jwtDecode from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token", err);
    return true; // Treat invalid token as expired
  }
};
