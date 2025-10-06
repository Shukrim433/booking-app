import decode from "jwt-decode";

class AuthService {
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

isTokenExpired(token) {
  // if statement to prevent app from crashing if login/signup fails and no token is returned:
    if (!token) return true; // no token means "expired"

    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token"); // cleanup
        return true;
      }
      return false;
    } catch (err) {
      console.error("Invalid token in isTokenExpired:", err.message);
      localStorage.removeItem("id_token"); // remove bad token
      return true;
    }
  }

  getProfile() {
    // retrieves the payload of the JWT
    return decode(this.getToken());
  }

  loggedIn() {
    // checks if token is expired or not (ie whether or not theyre still logged in)
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
}

export default new AuthService();
