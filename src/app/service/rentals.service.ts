import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalsService {
url = 'https://localhost:44343/api/carrentals';


constructor(private http: HttpClient) {}

// admin
getAllRentedCars() {
  return this.http.get(this.url);
}

getRentalsById(id: number) {
  return this.http.get('https://localhost:44343/api/carrental' + '?id=' + id);
}

getRentalsByUserId(id: number) {
  return this.http.get('https://localhost:44343/api/carrental/userid' + '?id=' + id);
}

updateRentalsWithTotalPrice(id: number, body) {
return this.http.put(this.url + '?id=' + id, body);
}

deleteRentedCar(id: number) {
  return this.http.delete(this.url + '?id=' + id);
}

}
