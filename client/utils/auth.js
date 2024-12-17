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
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getProfile() {
    // retrieves the payload of the JWT
    return decode(this.getToken());
  }

  loggedIn() {
    // checks if token is expired or not (ie whether or not theyre still logged in)
    const token = this.getToken();
    return token && !token.isTokenExpired(token) ? true : false;
  }
}

export default new AuthService();
