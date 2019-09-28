import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  rootUrl = "https://localhost:44343/";

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(body) {
    let reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(this.rootUrl + "api/Account/Register", body, {
      headers: reqHeader
    });
  }

  // for LogIn , for getting the token from server
  userAuthenticate(userName, password) {
    var data =
      "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",
      "No-Auth": "True"
    });
    return this.http.post(this.rootUrl + "token", data, { headers: reqHeader });
  }

  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    this.router.navigate(["/login"]);
  }

  // ili kada zoves neki kontroler, iz UserService
  getUserClaims() {
    return this.http.get(this.rootUrl + "/api/GetUseClaims");
    // it will get it through interceptors ,  {headers: new HttpHeaders({'Authorization': 'Bearer' + localStorage.getItem('userToken')})});
  }

  // u servisu za register i za token request ne zaboravi da dodajes no-auth property u headeru
  // var reqHeader = new HttpHeaders({'No-Auth':'True'})
  // nad napravis dugme za logout
}
