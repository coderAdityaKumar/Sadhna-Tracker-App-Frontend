import * as jwt_decode from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwt_decode.default(token);
    const currentTime = Date.now() / 1000;

    console.log("Decoded Token:", decoded);
    console.log("Token Expiration:", decoded.exp);
    console.log("Current Time:", currentTime);

    // Check if exp field exists
    if (!decoded.exp) return true;

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Token decoding error:", error);
    return true;
  }
};
