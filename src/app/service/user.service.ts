import { AdminComponent } from './../admin/admin.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:44343/api/users';
  private username = localStorage.getItem('userName');
  private usernameUrl = 'https://localhost:44343/api/users/Username?username=' + this.username;

  constructor(private http: HttpClient) { }


  // because username is provided in token and is unique
getUserByUsername() {
  return this.http.get(
      this.usernameUrl
    //  ,{ headers : new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})}
  );
}

getUserById(id: number) {
  return this.http.get(this.url + '/' + id);
}

postUserPicture(id: number, uploadedFile) {
  return this.http.put('https://localhost:44343/api/users/' + id, uploadedFile);
}

updateUser(id: number, body) {
return this.http.put('https://localhost:44343/api/users/edit?id=' + id, body);
}

updateUsersPhone(id: number, body) {
  return this.http.put('https://localhost:44343/api/users/phone?id=' + id, body);
  }

getAllRoles() {
  var reqHeader = new HttpHeaders({ 'No-Auth' : 'True'});
  return this.http.get('https://localhost:44343/api/GetAllRoles', {headers: reqHeader});
}

roleMatch(allowedRole): boolean {
  let isMatch = false;
  let userRole: string[] = JSON.parse(localStorage.getItem("role"));
  console.log(userRole);

  allowedRole.forEach(element => {
    if (userRole.indexOf(element) > -1 ) {
      isMatch = true;
      return false;
    }
  });

  return isMatch;

}

// admin
getAllUsers() {
  return this.http.get(this.url);
}

// admin
getTotalNumberOfUsers() {
  return this.http.get(this.url + '/totalusers');
}



}



