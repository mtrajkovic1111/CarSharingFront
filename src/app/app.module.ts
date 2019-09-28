import { YesNoPipe } from './shared/yesno.pipe';
import { CarService } from './service/car.service';
import { AuthGuard } from './quards/auth-guard.service';
// import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { FooterIconsComponent } from './footer-icons/footer-icons.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ToastrModule} from 'ngx-toastr';
import { AddCarComponent } from './add-car/add-car.component';
import { AdditionalsComponent } from './additionals/additionals.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UsersCarComponent } from './users/users-car/users-car.component';
import { SearchCarComponent } from './search-car/search-car.component';
import { DataTableModule } from 'angular7-data-table';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChangeInfoComponent } from './users/profile/change-info/change-info.component';
import { AuthInterceptor } from './quards/auth.interceptor';
import { DropdownDirective } from './shared/dropdown.directive';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { DataTableComponent } from './admin/data-table/data-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { DetailsComponent } from './admin/admin-users/details/details.component';
import { AdminUsersCarComponent } from './admin/admin-users-car/admin-users-car.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminRentedCarsComponent } from './admin/admin-rented-cars/admin-rented-cars.component';
import { RentalsService } from './service/rentals.service';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { RentedCarComponent } from './rented-car/rented-car.component';
import { UserRentalsComponent } from './user-rentals/user-rentals.component';
import { UserRentalsDetailsComponent } from './user-rentals-details/user-rentals-details.component';
import { AddCarPictureComponent } from './add-car-picture/add-car-picture.component';
// import { DataTableModule } from 'angular-4-data-table/src/index';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
    NotFoundComponent,
    SignupComponent,
    FooterIconsComponent,
    WelcomeComponent,
    LoginSignupComponent,
    AddCarComponent,
    AdditionalsComponent,
    ProfileComponent,
    UsersCarComponent,
    SearchCarComponent,
    ChangeInfoComponent,
    DropdownDirective,
    AdminUsersComponent,
    DataTableComponent,
    DetailsComponent,
    AdminUsersCarComponent,
    AdminCarsComponent,
    AdminRentedCarsComponent,
    AddPhoneComponent,
    RentedCarComponent,
    UserRentalsComponent,
    YesNoPipe,
    UserRentalsDetailsComponent,
    AddCarPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    DataTableModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  providers: [
    UserService,
    AuthService,
    CarService,
    RentalsService,
    AuthGuard
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
