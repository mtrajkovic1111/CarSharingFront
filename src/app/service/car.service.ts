import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class CarService {
  Brands: any;
  Models: any;
  Variants: any;
  brandUrl = 'https://localhost:44343/api/brands';
  modelUrl = 'https://localhost:44343/api/models?brandId=';
  vaiantUrl = 'https://localhost:44343/api/variants?modelId=';
  transmissionUrl = 'https://localhost:44343/api/transmissions';
  fuelTypeUrl = 'https://localhost:44343/api/fueltype';
  cityUrl = 'https://localhost:44343/api/city';
  carUrl = 'https://localhost:44343/api/cars';
  vehicleUrl = 'https://localhost:44343/api/vehicle?';
  private username = localStorage.getItem('userName');

  constructor(private http: HttpClient) {}

  getBrands() {
    return this.http.get(this.brandUrl);
  }

  getModelsByBrand(brandId: number) {
    return this.http.get(this.modelUrl + brandId);
  }

  getVariantByModel(modelId: number) {
    return this.http.get(this.vaiantUrl + modelId);
  }

  getTransmission() {
    return this.http.get(this.transmissionUrl);
  }

  getFuelType() {
    return this.http.get(this.fuelTypeUrl);
  }

  getCities() {
    return this.http.get(this.cityUrl);
  }

  addCar(body) {
    return this.http.post(this.carUrl, body);
  }

  getVehicleId(modelId: number, variantId: number) {
   // https://localhost:44343/api/vehicle?modelId=4&variantId=6
    return this.http.get(this.vehicleUrl + 'modelId=' + modelId  + '&variantId=' + variantId);
  }

  updateAddedCar(carId: number, body) {
    return this.http.put(this.carUrl + '/' + carId, body);
  }

  getAllCarsByUsername() {
    return this.http.get(this.carUrl + '/username?username=' + this.username);

  }

  getAllVariants() {
    return this.http.get('https://localhost:44343/api/variants');
  }

  // tslint:disable-next-line:max-line-length
  getSearchedCars(cityId: number, startDate: string, endDate: string, brandId: number, modelId: number, variantId: number, transmissionId: number, fuelTypeId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://localhost:44343/api/cars/search?cityId=' + cityId
   + '&startDate=' + startDate + '&endDate=' + endDate
    + '&brandId=' + brandId + '&modelId=' + modelId + '&variantId=' + variantId + '&transmissionId=' +  transmissionId
    + '&fuelTypeId=' + fuelTypeId);

  }

  getVehicleModelVariant(vehicleId: number) {
    return this.http.get('https://localhost:44343/api/vehicle/string?vehicleId=' + vehicleId);
  }

  addToCarRental(body) {
    return this.http.post('https://localhost:44343/api/carrentals', body);
  }

  deleteUserCar(index: number) {
    return this.http.delete(this.carUrl + '/' + index);
  }

  // admin
getNumberOfUsersCar(id: number) {
  return this.http.get(this.carUrl + '/countcars?id=' + id);
}

// admin
getAllCars() {
  return this.http.get(this.carUrl + '/all');
}

// admin
getTotalNumberOfCars() {
  return this.http.get(this.carUrl);
}

getById(id: number) {
  return this.http.get(this.carUrl + '?id=' + id);
}

getAllRelatedById(id: number) {
  return this.http.get(this.carUrl + '/allbyid?id=' + id);
}

postCarPicture(id: number, uploadedFile) {
  return this.http.put(this.carUrl + '/addcarpic?id=' + id, uploadedFile);
}

}
